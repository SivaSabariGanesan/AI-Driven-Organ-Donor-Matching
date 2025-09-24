import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { Organ } from "../models/Organ.js";

const router = Router();

// Create an organ donation (by logged-in donor)
router.post("/", authenticate, async (req, res) => {
  try {
    const { type, bloodGroup, gender } = req.body;
    if (!type || !bloodGroup || !gender) {
      return res.status(400).json({ message: "type, bloodGroup, and gender are required" });
    }
    const organ = await Organ.create({ type, bloodGroup, gender, donor: req.user.id });
    return res.status(201).json(organ);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create organ", error: error.message });
  }
});

// List available organs
router.get("/", async (_req, res) => {
  try {
    const organs = await Organ.find({ availabilityStatus: "available" })
      .populate("donor", "name email phone address")
      .sort({ createdAt: -1 });
    return res.json(organs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch organs", error: error.message });
  }
});

// List organs donated by the logged-in user
router.get("/mine", authenticate, async (req, res) => {
  try {
    const organs = await Organ.find({ donor: req.user.id }).sort({ createdAt: -1 });
    return res.json(organs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user's organs", error: error.message });
  }
});

export default router;


