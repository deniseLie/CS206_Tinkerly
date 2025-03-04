// routes/serviceProviderRoutes.js
const express = require('express');
const router = express.Router();
const serviceProviderController = require('../controllers/serviceProviderController');

// Create a new service provider
router.post('/', serviceProviderController.createServiceProvider);

// Get all service providers
router.get('/', serviceProviderController.getServiceProviders);

// Get a single service provider by ID
router.get('/:id', serviceProviderController.getServiceProviderById);

// Update a service provider by ID
router.put('/:id', serviceProviderController.updateServiceProvider);

// Delete a service provider by ID
router.delete('/:id', serviceProviderController.deleteServiceProvider);

module.exports = router;
