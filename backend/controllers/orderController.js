const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');


exports.createOrder = async (req, res) => {
  const { items, type, address } = req.body;
  try {
    
    let total = 0;
    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem || !menuItem.available) return res.status(400).json({ msg: 'Invalid item' });
      total += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      total,
      type,
      address: type === 'delivery' ? address : undefined
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.menuItem');
  res.json(orders);
};


exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('items.menuItem');
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').populate('items.menuItem');
  res.json(orders);
};