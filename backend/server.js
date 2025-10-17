const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./userModel');
const Lead = require('./leadModel');  // ✅ import the new model

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/loginSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ==========================
// USER AUTH ROUTES
// ==========================
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({ status: 'ok', user });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ status: 'error', error: 'Invalid login' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ status: 'ok', token });
  } else {
    return res.json({ status: 'error', error: 'Invalid login' });
  }
});

// ==========================
// LEADS ROUTES
// ==========================
app.post('/data', async (req, res) => {
  try {
    const {
      name,
      phone,
      destination,
      travelDate,
      guest,
      budget,
      email,
      createdAt,
      source,
      assignedTo,
      status,
      nextFollowUp,
      notes,
    } = req.body;

    const lead = await Lead.create({
      name,
      phone,
      destination,
      travelDate,
      guest,
      budget,
      email,
      createdAt,
      source,
      assignedTo,
      status,
      nextFollowUp,
      notes,
    });

    res.json({ status: 'ok', lead });
  } catch (err) {
    console.error(err);
    res.json({ status: 'error', error: 'Failed to add lead' });
  }
});

app.get('/data', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ status: 'ok', leads });
  } catch (err) {
    res.json({ status: 'error', error: 'Failed to fetch leads' });
  }
});

// ✅ Update a lead
app.put("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ status: "ok", lead: updatedLead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: "Failed to update lead" });
  }
});
// ==========================
// SERVER START
// ==========================
app.listen(5000, () => console.log('✅ Server started on port 5000'));
