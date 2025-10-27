import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "../models/User.js";

const router = Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = () => genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

router.post("/", authenticate, async (req, res) => {
  try {
    const { message } = req.body;
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ message: "Missing GOOGLE_API_KEY" });
    }
    if (!message || typeof message !== "string") {
      return res.status(400).json({ message: "message is required" });
    }
    // Lightweight content guard against clearly irrelevant/inappropriate topics
    const disallowed = ["hack", "password", "credit card", "violence", "hate", "explicit", "sex" ];
    const lower = message.toLowerCase();
    if (disallowed.some((k) => lower.includes(k))) {
      return res.status(400).json({
        message: "This chatbot is for general medical information and organ donation guidance only.",
      });
    }

    const safetyPreamble =
      "You are a helpful assistant for medical triage and organ donation info. Provide general guidance only, not a diagnosis. Encourage contacting healthcare professionals for urgent or complex cases. Never reveal API keys. Keep responses under 120 words. When helpful, end with exactly one short relevant follow-up question to clarify the user's need.";
    const prompt = `${safetyPreamble}\n\nUser message: ${message}`;
    const result = await model().generateContent(prompt);
    const text = result?.response?.text?.() || "Sorry, I could not generate a response.";

    // Store chat history for the user
    if (req.user && req.user.id) {
      await User.findByIdAndUpdate(
        req.user.id,
        { $push: { chatHistory: [
          { role: 'user', message, timestamp: new Date() },
          { role: 'bot', message: text, timestamp: new Date() }
        ] } },
        { new: false }
      );
    }

    return res.json({ reply: text });
  } catch (error) {
    return res.status(500).json({ message: "Chat failed", error: error.message });
  }
});

// Get chat history for the authenticated user
router.get('/history', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, 'chatHistory');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.chatHistory || []);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch chat history', error: e.message });
  }
});

export default router;


