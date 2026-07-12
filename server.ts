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
          systemInstruction: "You are HealthBuddy, an official GovTech Singapore FH Assistant. Your role is to help answer patient questions about Familial Hypercholesterolaemia (FH), test costs, government subsidies (50-75% for eligible Singapore citizens), and the Life Insurance Association (LIA) moratorium on genetic testing. Under this moratorium, insurers cannot ask you to undergo or disclose genetic test results for standard health or life coverage. Reassure the user, explain concepts clearly and succinctly, and use a friendly, professional tone. If they ask about booking or canceling, mention that they can do it directly in this app simulator.",
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
