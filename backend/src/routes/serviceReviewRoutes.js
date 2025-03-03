// routes/serviceReviewRoutes.js
const express = require('express');
const router = express.Router();
const serviceReviewController = require('../controllers/serviceReviewController');

// Create a new service review
router.post('/', serviceReviewController.createServiceReview);

// Get all service reviews
router.get('/', serviceReviewController.getServiceReviews);

// Get a single service review by ID
router.get('/:id', serviceReviewController.getServiceReviewById);

// Update a service review by ID
router.put('/:id', serviceReviewController.updateServiceReview);

// Delete a service review by ID
router.delete('/:id', serviceReviewController.deleteServiceReview);

module.exports = router;
