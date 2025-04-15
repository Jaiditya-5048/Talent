const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listingStatus: { type: Boolean, default: true },
  images: [String],
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String
  }],
  timestamps: true
});
