const InvoiceGenerator = (function () {
    let invoiceData = {};
    let templates = {
        1: 'Template 1 Content',  // Define your templates here
        2: 'Template 2 Content'
    };

    function init(data) {
        invoiceData = data;
    }

    function generateInvoice(templateId = 1) {
        let templateContent = templates[templateId];
        // Process the templateContent with invoiceData
        // This is where you'd merge your data with the template
        let invoiceContent = templateContent.replace(/{companyName}/g, invoiceData.companyName)
                                            .replace(/{pickupLocation}/g, invoiceData.pickupLocation)
                                            .replace(/{deliveryItems}/g, invoiceData.deliveryItems.join(", "));
        return invoiceContent;
    }

    async function generatePDF(templateId = 1) {
        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { width, height } = page.getSize();

        const text = generateInvoice(templateId);
        page.drawText(text, {
            x: 50,
            y: height - 50,
            size: 12,
        });

        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    }

    async function downloadPDF(templateId = 1) {
        const pdfBytes = await generatePDF(templateId);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invoice.pdf';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    }

    return {
        init,
        generateInvoice,
        generatePDF,
        downloadPDF
    };
})();

// Example usage
function generateAndDownloadInvoice() {
    const invoiceData = {
        companyName: "ABC Corp",
        pickupLocation: "123 Main St",
        deliveryItems: ["Item 1", "Item 2", "Item 3"]
    };

    InvoiceGenerator.init(invoiceData);
    InvoiceGenerator.downloadPDF(1);  // 1 for template 1
}
