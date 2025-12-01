const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

exports.createOrder = async (req, res) => {
  const { items, type, address } = req.body;
  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ msg: 'No items in order' });
    }

    let total = 0;
    const validatedItems = [];
    for (let item of items) {
      try {
        if (!item.menuItem || !item.quantity || item.quantity < 1) {
          return res.status(400).json({ msg: 'Invalid item format' });
        }
        const menuItem = await MenuItem.findById(item.menuItem);
        if (!menuItem || !menuItem.available) {
          return res.status(400).json({ msg: `Invalid item: ${item.menuItem}` });
        }
        total += menuItem.price * item.quantity;
        validatedItems.push({ menuItem: menuItem._id, quantity: item.quantity });
      } catch (itemError) {
        console.error('Item validation error:', itemError.message);  // Logs CastError
        return res.status(400).json({ msg: 'Invalid menu item ID' });
      }
    }

    const user = req.user ? req.user.id : null;
    const order = await Order.create({
      user,
      items: validatedItems,
      total,
      type,
      address: type === 'delivery' ? address : undefined
    });
    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error.message);
    res.status(500).json({ msg: 'Server error in order creation' });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    if (!['pending', 'preparing', 'ready', 'delivered'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('items.menuItem');
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};