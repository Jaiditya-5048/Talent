const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ['customer', 'seller', 'admin'], default: 'customer' },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  shippingAddresses: [{
    addressLine1: String,
    city: String,
    zip: String,
    country: String
  }]
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});
