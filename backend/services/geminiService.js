const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateHint = async (problemTitle) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a DSA mentor. Give only conceptual hints. Never provide code or the complete solution.",
        },
        {
          role: "user",
          content: `Give a conceptual hint for the DSA problem: ${problemTitle}.
          
Rules:
- No code.
- No full solution.
- Maximum 4 lines.
- Mention only the approach or algorithm idea.`,
        },
      ],
      temperature: 0.5,
      max_tokens: 120,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "Unable to generate AI hint.";
  }
};

module.exports = { generateHint };