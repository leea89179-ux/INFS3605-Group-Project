import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Chatbot proxying to Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language, isFHReferred } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const isReferred = isFHReferred !== false; // default to true if not specified

      const languageInstructions: Record<string, string> = {
        ms: "Respond in Bahasa Malaysia (Malay). Keep medical terms like 'Familial Hypercholesterolaemia (FH)', 'LDL', 'statin', 'LDLR', 'MediSave', 'CHAS', 'Singpass' in their original form. All other text should be in natural, clear Bahasa Malaysia.",
        zh: "Respond in Simplified Chinese (简体中文). Keep medical abbreviations like FH, LDL, PCSK9, LDLR, MediSave, CHAS, Singpass in their original form. All explanations should be in clear, patient-friendly Simplified Chinese.",
        ta: "Respond in Tamil (தமிழ்). Keep medical terms like 'Familial Hypercholesterolaemia (FH)', 'LDL', 'statin', 'MediSave', 'CHAS', 'Singpass' in their original form. Explain all other content in clear, accessible Tamil.",
        en: "Respond in English.",
      };
      const langInstruction = languageInstructions[language as string] || languageInstructions.en;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY environment variable is not defined on the server.");
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is not configured" });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = isReferred
        ? `You are HealthBuddy, an official GovTech Singapore FH Assistant. Answer patient questions about Familial Hypercholesterolaemia (FH), test costs, MOH subsidies (50-75% for eligible citizens), and the LIA insurance moratorium. CRITICAL: Keep your answers extremely concise, direct, and reassurance-focused (maximum 2-3 short, friendly sentences). Do NOT use long paragraphs. Always use standard double-asterisks around key terms **like this** for bolding so they can be parsed correctly. If they ask about scheduling, booking, or modifying appointments, mention that they can do it directly in the 'Book' tab of this app. IMPORTANT — Language instruction: ${langInstruction} Never translate medication names (statins, Atorvastatin, Rosuvastatin, Ezetimibe), laboratory values (LDL, HDL, mmol/L), or universally recognized clinical abbreviations (LDLR, APOB, PCSK9) unless an official localized equivalent exists.`
        : `You are HealthBuddy, an official GovTech Singapore Patient Assistant. Answer patient questions about standard polyclinic or clinical appointments, general booking, consultation fees, CHAS subsidies, and general healthcare preparation. CRITICAL: Keep your answers extremely concise, direct, and reassurance-focused (maximum 2-3 short, friendly sentences). Do NOT use long paragraphs, and do NOT mention FH or genetic testing (since this patient has a standard primary care clinic referral). Always use standard double-asterisks around key terms **like this** for bolding so they can be parsed correctly. If they ask about scheduling, booking, or modifying appointments, mention that they can do it directly in the 'Book' tab of this app. IMPORTANT — Language instruction: ${langInstruction}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const reply = response.text || "I apologize, but I could not process that message.";
      return res.json({ text: reply });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
