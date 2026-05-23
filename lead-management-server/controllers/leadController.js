const Lead = require('../models/Lead');

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  try {
    const { fullName, email, phone, source } = req.body;

    if (!fullName || !email || !phone || !source) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const lead = await Lead.create({ fullName, email, phone, source });

    res.status(201).json({
      message: 'Lead submitted successfully',
      lead,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    // Handle duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      if (field === 'email') {
        return res.status(409).json({ message: 'Email or Phone number already exist' });
      } else if (field === 'phone') {
        return res.status(409).json({ message: 'Email or Phone number already exist' });
      }
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private (Admin only)
const getLeads = async (req, res) => {
  try {
    const { source, search, sort = 'newest' } = req.query;

    const filter = {};

    if (source && source !== 'All') {
      filter.source = source;
    }

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const sortOrder = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const leads = await Lead.find(filter).sort(sortOrder);

    const totalLeads = await Lead.countDocuments();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayLeads = await Lead.countDocuments({ createdAt: { $gte: todayStart } });

    const sourceStats = await Lead.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
    ]);

    res.json({
      leads,
      stats: {
        total: totalLeads,
        today: todayLeads,
        bySource: sourceStats,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin only)
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createLead, getLeads, deleteLead };
