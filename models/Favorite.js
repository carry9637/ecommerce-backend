const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    default: 'guest' // For now, using guest user
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure one product per user in favorites
favoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);