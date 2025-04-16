const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: String, // store at time of order
    price: Number,
    quantity: Number
  }],
  shippingAddress: {
    addressLine1: String,
    city: String,
    zip: String
  },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  payment: {
    method: String,
    status: String
  },
  timestamps: true
});
