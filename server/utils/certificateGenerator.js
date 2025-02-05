const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateCertificate = (userId, userName, courseId, courseTitle) => {
    const certificatesDir = path.join(__dirname, '../certificates');
    
    
    if (!fs.existsSync(certificatesDir)) {
        fs.mkdirSync(certificatesDir, { recursive: true });
    }

    const certificatePath = path.join(certificatesDir, `${userId}-${courseId}.pdf`);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(certificatePath));

    doc
        .fontSize(24)
        .text('Certificate of Completion', { align: 'center' })
        .moveDown()
        .fontSize(18)
        .text(`This is to certify that`, { align: 'center' })
        .moveDown()
        .fontSize(20)
        .text(`${userName}`, { align: 'center', underline: true })
        .moveDown()
        .fontSize(18)
        .text(`has successfully completed the course`, { align: 'center' })
        .moveDown()
        .fontSize(22)
        .text(`${courseTitle}`, { align: 'center', bold: true });

    doc.end();
    
    return `/certificates/${userId}-${courseId}.pdf`;
};

module.exports = generateCertificate;
