class InvoiceGenerator {
    constructor() {
        this.invoiceData = {};
        this.templates = {
            1: 'Invoice for {companyName}\nPickup Location: {pickupLocation}\nDelivery Items: {deliveryItems}',
            2: 'Company: {companyName}\nItems: {deliveryItems}\nPickup: {pickupLocation}'
        };
    }

    init(data) {
        this.invoiceData = data;
    }

    generateInvoice(templateId = 1) {
        let templateContent = this.templates[templateId];
        let invoiceContent = templateContent.replace(/{companyName}/g, this.invoiceData.companyName)
                                            .replace(/{pickupLocation}/g, this.invoiceData.pickupLocation)
                                            .replace(/{deliveryItems}/g, this.invoiceData.deliveryItems.join(", "));
        return invoiceContent;
    }

    async generatePDF(templateId = 1) {
        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { width, height } = page.getSize();

        const text = this.generateInvoice(templateId);
        page.drawText(text, {
            x: 50,
            y: height - 50,
            size: 12,
        });

        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    }

    async downloadPDF(templateId = 1) {
        const pdfBytes = await this.generatePDF(templateId);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invoice.pdf';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Example usage
function generateAndDownloadInvoice() {
    const invoiceData = {
        companyName: "ABC Corp",
        pickupLocation: "123 Main St",
        deliveryItems: ["Item 1", "Item 2", "Item 3"]
    };

    const invoiceGenerator = new InvoiceGenerator();
    invoiceGenerator.init(invoiceData);
    invoiceGenerator.downloadPDF(1);  // 1 for template 1
}
