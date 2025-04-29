const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  plan: {
    type: String,
    required: true,
    trim: true
  },
  cost: {
    type: Number,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true,
    trim: true
  },
  endDate: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
