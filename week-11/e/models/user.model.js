const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
  timestamps: true
});

// 🔁 Auto-increment "id" starting from 1
UserSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('User', UserSchema);
