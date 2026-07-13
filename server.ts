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
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

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

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: "You are HealthBuddy, an official GovTech Singapore FH Assistant. Answer patient questions about Familial Hypercholesterolaemia (FH), test costs, MOH subsidies (50-75% for eligible citizens), and the LIA insurance moratorium. CRITICAL: Keep your answers extremely concise, direct, and reassurance-focused (maximum 2-3 short, friendly sentences). Do NOT use long paragraphs. Always use standard double-asterisks around key terms **like this** for bolding so they can be parsed correctly. If they ask about scheduling, booking, or modifying appointments, mention that they can do it directly in the 'Book' tab of this app.",
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
      server: { middlewareMode: true },
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
