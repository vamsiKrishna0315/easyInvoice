class InvoiceGenerator {
    constructor() {
        // Initialize with empty invoice data and predefined templates
        this.invoiceData = {};
        this.templates = {
            1: 'Invoice for {companyName}\nPickup Location: {pickupLocation}\nDelivery Items: {deliveryItems}',
            2: 'Company: {companyName}\nItems: {deliveryItems}\nPickup: {pickupLocation}'
        };
    }

    // Method to set the invoice data
    init(data) {
        this.invoiceData = data;
    }

    // Method to generate invoice content based on a template
    generateInvoice(templateId = 1) {
        // Get the selected template
        let templateContent = this.templates[templateId];
        // Replace placeholders with actual data
        let invoiceContent = templateContent.replace(/{companyName}/g, this.invoiceData.companyName)
                                            .replace(/{pickupLocation}/g, this.invoiceData.pickupLocation)
                                            .replace(/{deliveryItems}/g, this.invoiceData.deliveryItems.join(", "));
        return invoiceContent;
    }

    // Method to generate a PDF from the invoice content
    async generatePDF(templateId = 1) {
        const { PDFDocument } = PDFLib; // Importing the PDFDocument class from pdf-lib
        const pdfDoc = await PDFDocument.create(); // Create a new PDF document
        const page = pdfDoc.addPage([600, 400]); // Add a page to the PDF with specified dimensions
        const { width, height } = page.getSize(); // Get the size of the page

        // Generate the invoice content using the selected template
        const text = this.generateInvoice(templateId);
        // Draw the text on the PDF page
        page.drawText(text, {
            x: 50,
            y: height - 50,
            size: 12,
        });

        // Save the PDF and return the byte array
        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    }

    // Method to download the generated PDF
    async downloadPDF(templateId = 1) {
        const pdfBytes = await this.generatePDF(templateId); // Generate the PDF
        const blob = new Blob([pdfBytes], { type: 'application/pdf' }); // Create a Blob from the PDF bytes
        const url = URL.createObjectURL(blob); // Create a URL for the Blob
        const a = document.createElement('a'); // Create a link element
        a.href = url; // Set the href to the Blob URL
        a.download = 'invoice.pdf'; // Set the download attribute with the desired file name
        document.body.appendChild(a); // Append the link to the body
        a.click(); // Simulate a click on the link to trigger the download
        URL.revokeObjectURL(url); // Revoke the object URL to free up memory
    }
}

// Example usage function
function generateAndDownloadInvoice() {
    const invoiceData = {
        companyName: "ABC Corp",
        pickupLocation: "123 Main St",
        deliveryItems: ["Item 1", "Item 2", "Item 3"]
    };

    const invoiceGenerator = new InvoiceGenerator(); // Create a new instance of InvoiceGenerator
    invoiceGenerator.init(invoiceData); 
    console.log("data", invoiceData);
    invoiceGenerator.downloadPDF(1);  // Generate and download the invoice using template 1
}
