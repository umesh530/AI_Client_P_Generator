

const form = document.getElementById('proposalForm');
const outputBox = document.getElementById('outputBox');
const proposalText = document.getElementById('proposalText');
const downloadBtn = document.getElementById('downloadBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const clientName = document.getElementById('clientName').value;
  const serviceType = document.getElementById('serviceType').value;
  const projectDetails = document.getElementById('projectDetails').value;

  proposalText.textContent = '⏳ Generating proposal...';
  outputBox.style.display = 'flex';
  downloadBtn.disabled = true;

  try {
    const response = await fetch('/api/proposal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientName, serviceType, projectDetails })
    });

    const data = await response.json();

    if (data.proposal) {
      proposalText.textContent = data.proposal;
      downloadBtn.disabled = false;
    } else {
      proposalText.textContent = '❌ Failed to generate proposal.';
    }
  } catch (error) {
    proposalText.textContent = '⚠️ Error contacting server.';
  }
});

downloadBtn.addEventListener('click', () => {
  window.open('/api/proposal/download', '_blank');
});
