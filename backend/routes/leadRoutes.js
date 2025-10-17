import express from "express";
import Lead from "../models/Lead.js";

const router = express.Router();

// ✅ Add new lead
router.post("/data", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json({ status: "ok", lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add lead" });
  }
});

// ✅ Get all leads
router.get("/data", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

// routes/leadRoutes.js (or wherever)
router.put("/data/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Lead.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ status: "ok", lead: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: "Update failed" });
  }
});


export default router;
