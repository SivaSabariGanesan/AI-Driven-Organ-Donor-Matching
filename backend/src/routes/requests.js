import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { Request } from "../models/Request.js";
import { Organ } from "../models/Organ.js";

const router = Router();

// List all requests (basic fields). Requires auth.
router.get("/", authenticate, async (_req, res) => {
  try {
    const items = await Request.find({})
      .populate({ path: "organ", select: "type bloodGroup availabilityStatus" })
      .populate({ path: "requester", select: "name email phone address" })
      .sort({ createdAt: -1 });
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch requests", error: error.message });
  }
});

// Create a request for an organ
router.post("/", authenticate, async (req, res) => {
  try {
    const { organId, notes, requestedType, requestedBloodGroup } = req.body;

    if (organId) {
      const organ = await Organ.findById(organId);
      if (!organ || organ.availabilityStatus !== "available") {
        return res.status(400).json({ message: "Organ not available" });
      }
      const request = await Request.create({ organ: organ._id, requester: req.user.id, notes });
      return res.status(201).json(request);
    }

    if (!requestedType || !requestedBloodGroup) {
      return res.status(400).json({ message: "requestedType and requestedBloodGroup are required if organId not provided" });
    }
    const request = await Request.create({ requestedType, requestedBloodGroup, requester: req.user.id, notes });
    return res.status(201).json(request);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create request", error: error.message });
  }
});

// List all requests of the logged-in user
router.get("/mine", authenticate, async (req, res) => {
  try {
    const requests = await Request.find({ requester: req.user.id })
      .populate({ path: "organ", select: "type bloodGroup availabilityStatus" })
      .sort({ createdAt: -1 });
    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch requests", error: error.message });
  }
});

// AI-based matching endpoint: returns each pending request with its best-matched available organ
router.get('/matches', authenticate, async (_req, res) => {
  try {
    const requests = await Request.find({ status: 'pending' })
      .populate({ path: 'requester', select: 'name email phone address' });
    const organs = await Organ.find({ availabilityStatus: 'available' })
      .populate('donor', 'name email phone address');
    const matches = requests.map(request => {
      const match = organs.find(organ =>
        organ.type === request.requestedType &&
        organ.bloodGroup === request.requestedBloodGroup
      );
      return {
        request,
        match: match || null
      };
    });
    res.json(matches);
  } catch (e) {
    res.status(500).json({ message: 'Matching failed', error: e.message });
  }
});

// Admin or donor could update request status (for demo keep it authenticated)
router.patch("/:id/status", authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "approved", "rejected", "fulfilled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Request not found" });

    // If fulfilled, mark organ as donated
    if (status === "fulfilled" && updated.organ) {
      await Organ.findByIdAndUpdate(updated.organ, { availabilityStatus: "donated" });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update status", error: error.message });
  }
});

export default router;


