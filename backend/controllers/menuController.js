const MenuItem = require('../models/MenuItem');


exports.getMenu = async (req, res) => {
  const { category, dietary, available, priceMax } = req.query;
  let query = { available: available !== 'false' };
  if (category) query.category = category;
  if (dietary) query.dietary = { $in: [dietary] };
  if (priceMax) query.price = { $lte: priceMax };

  try {
    const items = await MenuItem.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json({ msg: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};