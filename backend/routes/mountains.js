const express = require('express');
const Mountain = require('../models/Mountain');

const router = express.Router();

router.get('/mountains', async (req, res) => {
  try {
    const mountains = await Mountain.find();
    res.json(mountains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/mountains', async (req, res) => {
  const mountain = new Mountain(req.body);
  try {
    const newMountain = await mountain.save();
    res.status(201).json(newMountain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/mountains/:id', async (req, res) => {
  try {
    const mountain = await Mountain.findByIdAndDelete(req.params.id);
    if (!mountain) {
      return res.status(404).json({ message: 'Mountain not found' });
    }
    res.json({ message: 'Mountain deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/mountains/:id', async (req, res) => {
  try {
    const updatedMountain = await Mountain.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedMountain) {
      return res.status(404).json({ message: 'Mountain not found' });
    }
    res.json(updatedMountain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;