const PDFDocument = require('pdfkit');

const createUniqueCertificateId = () => {
  return `CERT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

const generatePdfBuffer = ({ userName, score, certificateId, date }) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc
    .fontSize(24)
    .fillColor('#0a3d91')
    .text('CERTIFICATE of ACHIEVEMENT', { align: 'center' })
    .moveDown(1);

  doc
    .fontSize(12)
    .fillColor('#444444')
    .text('Presented to', { align: 'center' })
    .moveDown(0.5);

  doc
    .fontSize(28)
    .fillColor('#111111')
    .text(userName, { align: 'center', underline: true })
    .moveDown(1);

  doc
    .fontSize(14)
    .fillColor('#444444')
    .text('For outstanding performance in the quiz.', { align: 'center' })
    .moveDown(1);

  doc
    .fontSize(16)
    .fillColor('#111111')
    .text(`Score: ${score}%`, { align: 'center' })
    .moveDown(0.5);

  doc
    .fontSize(12)
    .text(`Date: ${date}`, { align: 'center' })
    .moveDown(1);

  doc
    .fontSize(10)
    .fillColor('#666666')
    .text(`Certificate ID: ${certificateId}`, { align: 'center' })
    .moveDown(2);

  doc
    .fontSize(12)
    .fillColor('#0a3d91')
    .text('Congratulations!', { align: 'center' });

  doc.end();
  return new Promise((resolve, reject) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
    doc.on('error', reject);
  });
};

module.exports = { createUniqueCertificateId, generatePdfBuffer };
