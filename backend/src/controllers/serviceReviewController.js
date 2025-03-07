// controllers/serviceReviewController.js
const { ServiceReview } = require('../models');

// Create a new service review
exports.createServiceReview = async (req, res) => {
  try {
    const review = await ServiceReview.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all service reviews
exports.getServiceReviews = async (req, res) => {
  try {
    const reviews = await ServiceReview.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single service review by ID
exports.getServiceReviewById = async (req, res) => {
  try {
    const review = await ServiceReview.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Service Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service review by ID
exports.updateServiceReview = async (req, res) => {
  try {
    const review = await ServiceReview.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Service Review not found' });
    }
    await review.update(req.body);
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a service review by ID
exports.deleteServiceReview = async (req, res) => {
  try {
    const review = await ServiceReview.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Service Review not found' });
    }
    await review.destroy();
    res.json({ message: 'Service Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};