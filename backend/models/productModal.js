const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter peoduct name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter peoduct description"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLength: [8, "price canot exceed 8 characters"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: [true, "please enter product catagory"],
      },
    },
  ],
  catagory: {
    type: String,
    required: [true, "please enter product catagory"],
  },
  stock: {
    type: Number,
    required: [true, "please enter product stock"],
    maxLength: [4, "stock cannot exceed 4 chracters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      ratings: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
