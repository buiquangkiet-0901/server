const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  maxGroupSize: { type: Number, required: true },
  startDate: { type: Date, required: true },
  image: { type: String },
  ratings: { type: Number, default: 0 },
  reviews: [{ user: String, comment: String, rating: Number }],
});

module.exports = mongoose.model("Tour", TourSchema);
