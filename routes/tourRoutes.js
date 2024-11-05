const express = require("express");
const router = express.Router();
const Tour = require("../models/tours");


// Lấy danh sách tất cả các tour
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tours" });
  }
});

// Lấy chi tiết một tour
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tour" });
  }
});

// Thêm một tour mới
router.post("/", async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(400).json({ message: "Error creating tour" });
  }
});

// Cập nhật một tour
router.put("/:id", async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTour) return res.status(404).json({ message: "Tour not found" });
    res.json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: "Error updating tour" });
  }
});

// Xóa một tour
router.delete("/:id", async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ message: "Tour not found" });
    res.json({ message: "Tour deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tour" });
  }
});

module.exports = router;
