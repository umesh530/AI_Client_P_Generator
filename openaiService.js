const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateAIProposal = async ({ clientName, serviceType, projectDetails }) => {
  const prompt = `
Write a professional and friendly client proposal for the following:
Client Name: ${clientName}
Service: ${serviceType}
Project Details: ${projectDetails}

Include:
- Greeting
- What services will be delivered
- Brief timeline
- Why the freelancer is a good fit
- Call to action
  `;

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a professional freelance proposal writer.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 400,
  });

  const aiResponse = chatCompletion.choices[0].message.content;
  return aiResponse;
};

module.exports = { generateAIProposal };
