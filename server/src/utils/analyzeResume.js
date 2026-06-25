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
You are an ATS Resume Expert and Career Matchmaker.

TASK:
Analyze the resume and return a strict ATS evaluation.

OUTPUT RULE:
You MUST return ONLY a valid JSON object.
Do NOT include any text before or after JSON.
Do NOT use markdown.
Do NOT write explanations.
Do NOT write "Here is..." or any prefix.

STRICT JSON SCHEMA:
{
  "score": 0,
  "scoringStatus": "",
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "suggestions": [],
  "inDemandSkills": [],
  "topCompanies": []
}

SCORING RULES:
- 0–20: very poor ATS match (missing structure, skills, keywords)
- 21–40: weak match (few relevant keywords, poor formatting)
- 41–60: average match (some relevant skills, moderate optimization)
- 61–80: strong match (good keyword coverage, relevant experience)
- 81–100: excellent ATS optimization (highly relevant + well structured)

RULES:
- score must be an integer between 0 and 100
- scoringStatus must be exactly one of:
  ["very poor", "weak", "average", "strong", "excellent"]

EXTRA REQUIREMENTS:
- inDemandSkills: 5 to 10 items based on current job market trends
- topCompanies: exactly 5 companies based on skill fit (NOT extracted from resume)
- suggestions: actionable improvements for ATS optimization
- missingKeywords: important missing industry keywords

IMPORTANT:
- You MUST NOT include any text outside JSON
- You MUST ensure JSON is always valid
- If unsure, still return best possible JSON

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
