const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  _id: false
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    default: 'guest' // For now, using guest user
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  },
  itemCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.itemCount = this.items.reduce((total, item) => total + item.quantity, 0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);