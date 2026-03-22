import PDFDocument from 'pdfkit';

export const generateInvoiceBuffer = (invoice) => new Promise((resolve) => {
  const doc = new PDFDocument({ margin: 50 });
  const chunks = [];
  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => resolve(Buffer.concat(chunks)));

  doc.fontSize(20).text('Gym SaaS Invoice');
  doc.moveDown();
  doc.fontSize(12).text(`Invoice ID: ${invoice.invoiceNumber}`);
  doc.text(`Member: ${invoice.memberName}`);
  doc.text(`Gym: ${invoice.gymName}`);
  doc.text(`Amount: ${invoice.amount} ${invoice.currency}`);
  doc.text(`Payment Method: ${invoice.method}`);
  doc.text(`Date: ${new Date(invoice.paidAt).toLocaleString()}`);
  doc.end();
});
