const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
      unique: true,
    },
    source: {
      type: String,
      required: [true, 'Source is required'],
      enum: ['Website', 'Facebook', 'Google', 'Referral'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
