const express = require('express');
const router = express.Router();
const { createLead, getLeads, deleteLead } = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

router.post('/', createLead);
router.get('/', protect, getLeads);
router.delete('/:id', protect, deleteLead);

module.exports = router;
