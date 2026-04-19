const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Certificate = require('../models/Certificate');
const { generatePdfBuffer } = require('../utils/certificateUtils');

const router = express.Router();

router.get('/:certificateId/download', authMiddleware, async (req, res) => {
  try {
    const { certificateId } = req.params;
    const certificate = await Certificate.findOne({ certificateId, user: req.user._id });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const dateString = certificate.createdAt.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric',
    });

    const pdfBuffer = await generatePdfBuffer({
      userName: certificate.userName,
      score: certificate.score,
      certificateId: certificate.certificateId,
      date: dateString,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=certificate-${certificate.certificateId}.pdf`,
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to generate certificate PDF' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const certificates = await Certificate.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load certificates' });
  }
});

module.exports = router;
