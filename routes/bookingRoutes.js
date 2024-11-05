const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");

// Lấy danh sách tất cả các đặt tour
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("tour").populate("user");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// Lấy thông tin một đặt tour
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("tour").populate("user");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking" });
  }
});

// Tạo một đặt tour mới
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: "Error creating booking" });
  }
});

// Cập nhật thông tin đặt tour
router.put("/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: "Error updating booking" });
  }
});

// Xóa đặt tour
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking" });
  }
});

module.exports = router;
