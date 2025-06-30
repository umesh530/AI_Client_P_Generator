const express = require('express');
const router = express.Router();
const { generateProposal, downloadProposalPDF } = require('../controllers/proposalController');

router.post('/', generateProposal);

router.get('/download', downloadProposalPDF);

module.exports = router;
