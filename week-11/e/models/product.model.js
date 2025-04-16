const ProductSchema = new mongoose.Schema({
  id: {type: Number , unique: true},
  title: String,
  brand: String,
  description: String,
  discountPercentage: Number,
  price: Number,
  stock: Number,
  category: String,
  // seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listingStatus: { type: Boolean, default: true },
  images: [String],
  rating: Number,
  thumbnail: String,
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    timestamps
  }],
  timestamps: true
});
