let lastGeneratedProposal = "";

const generateProposal = async (req, res) => {
  const { clientName, serviceType, projectDetails } = req.body;

  if (!clientName || !serviceType || !projectDetails) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const proposalText = `
Hello ${clientName},

Thank you for considering me for your ${serviceType} project. Based on your input — "${projectDetails}" — I am confident I can deliver an excellent solution tailored to your needs.

Looking forward to collaborating!

Best regards,  
Your Freelancer
  `;

  lastGeneratedProposal = proposalText;
  res.status(200).json({ proposal: proposalText });
};

const { generateProposalPDF } = require('../utils/pdfGenerator');

const downloadProposalPDF = async (req, res) => {
  try {
    if (!lastGeneratedProposal) {
      return res.status(400).json({ error: 'No proposal available to download.' });
    }

    const filename = `proposal_${Date.now()}.pdf`;
    const filePath = await generateProposalPDF(lastGeneratedProposal, filename);
    res.download(filePath);
  } catch (error) {
    console.error('PDF generation error:', error.message);
    res.status(500).json({ error: 'Failed to generate PDF.' });
  }
};

module.exports = { generateProposal, downloadProposalPDF };
