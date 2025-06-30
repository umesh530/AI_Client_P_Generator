const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateProposalPDF = (proposalText, filename) => {
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, '..', 'generated', filename);

    // Ensure the folder exists
    fs.mkdirSync(path.join(__dirname, '..', 'generated'), { recursive: true });

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(14).text(proposalText, {
        align: 'left',
        lineGap: 6,
    });

    doc.end();

    return new Promise((resolve, reject) => {
        writeStream.on('finish', () => resolve(filePath));
        writeStream.on('error', reject);
    });
};

module.exports = { generateProposalPDF };
