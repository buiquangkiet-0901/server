const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookingDate: { type: Date, default: Date.now },
  numGuests: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);
