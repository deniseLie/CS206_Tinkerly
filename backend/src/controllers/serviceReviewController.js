// controllers/serviceReviewController.js
const { ServiceReview, Service, ServiceType } = require('../models');

exports.getReviewsByServiceProvider = async (req, res) => {
  try {
    const { spID } = req.params;

    const reviews = await ServiceReview.findAll({
      include: {
        model: Service,
        include: {
          model: ServiceType,
          where: { spID },
          attributes: [], // Exclude service type details from the response
        },
        attributes: ['typeID'], // Fetch typeID from Service
      },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new service review
exports.createServiceReview = async (req, res) => {
  try {
    // Create the new service review
    const review = await ServiceReview.create(req.body);

    // After the review is submitted, update the associated Service to set ongoing to false.
    await Service.update(
      { ongoing: false },
      { where: { serviceID: review.serviceID } }
    );

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