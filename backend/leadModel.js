const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  destination: { type: String, required: true },
  travelDate: { type: String, required: true },
  guest: { type: Number, required: true },
  budget: { type: String, required: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
  source: { type: String },
  assignedTo: { type: String },
  status: { type: String, default: "New" },
  nextFollowUp: { type: String },
  notes: { type: String },
});

module.exports = mongoose.model('Lead', leadSchema);
