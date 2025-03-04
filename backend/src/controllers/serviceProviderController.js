// controllers/serviceProviderController.js
const { ServiceProvider } = require('../models');

// Create a new service provider
exports.createServiceProvider = async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.create(req.body);
    res.status(201).json(serviceProvider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all service providers
exports.getServiceProviders = async (req, res) => {
  try {
    const serviceProviders = await ServiceProvider.findAll();
    res.json(serviceProviders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single service provider by ID
exports.getServiceProviderById = async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findByPk(req.params.id);
    if (!serviceProvider) {
      return res.status(404).json({ message: 'Service Provider not found' });
    }
    res.json(serviceProvider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service provider by ID
exports.updateServiceProvider = async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findByPk(req.params.id);
    if (!serviceProvider) {
      return res.status(404).json({ message: 'Service Provider not found' });
    }
    await serviceProvider.update(req.body);
    res.json(serviceProvider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a service provider by ID
exports.deleteServiceProvider = async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findByPk(req.params.id);
    if (!serviceProvider) {
      return res.status(404).json({ message: 'Service Provider not found' });
    }
    await serviceProvider.destroy();
    res.json({ message: 'Service Provider deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};