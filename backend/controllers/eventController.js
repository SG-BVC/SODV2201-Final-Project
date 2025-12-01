const Event = require('../models/Event');


exports.createEvent = async (req, res) => {
  const { name, date, time, guests, menuSelections } = req.body;
  try {
    const event = await Event.create({
      name,
      date,
      time,
      guests,
      menuSelections
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.getMyEvents = async (req, res) => {
  const events = await Event.find({  });
  res.json(events);
};


exports.approveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, {
      status: 'approved',
      approvedBy: req.user.id
    }, { new: true }).populate('menuSelections');
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.getAllEvents = async (req, res) => {
  const events = await Event.find().populate('approvedBy', 'name');
  res.json(events);
};