// // utils/analyzeResume.js

// import ai from "../config/gemini.js";

// export const analyzeResumeATS = async (resumeText) => {
//   const prompt = `
// You are an ATS Resume Expert.

// Analyze this resume and return ONLY valid JSON.

// {
//   "score": number,
//   "strengths": [],
//   "weaknesses": [],
//   "missingKeywords": [],
//   "suggestions": []
// }

// Resume:

// ${resumeText}
// `;

//   const response = await ai.models.generateContent({
//     // model: "gemini-2.5-flash",
//      model: "gemini-2.0-flash",
//     contents: prompt,
//   });

//   return response.text;
// };

import openrouter from "../config/openrouter.js";

export const analyzeResumeATS = async (resumeText) => {
  const prompt = `
You are an ATS Resume Expert.

Analyze this resume.

Return ONLY valid JSON.

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "suggestions": []
}

Resume:

${resumeText}
`;

  const completion = await openrouter.chat.completions.create({
    //   model: "meta-llama/llama-3.3-70b-instruct:free",
    model: "meta-llama/llama-3.1-8b-instruct",
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let content = completion.choices[0].message.content;

  content = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(content);
};
