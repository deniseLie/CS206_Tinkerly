// controllers/serviceTypeController.js
const { ServiceType } = require('../models');

// Create a new ServiceType
exports.createServiceType = async (req, res) => {
  try {
    const serviceType = await ServiceType.create(req.body);
    res.status(201).json(serviceType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ServiceTypes
exports.getServiceTypes = async (req, res) => {
  try {
    const serviceTypes = await ServiceType.findAll();
    res.json(serviceTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a ServiceType by ID
exports.getServiceTypeById = async (req, res) => {
  try {
    const serviceType = await ServiceType.findByPk(req.params.id);
    if (!serviceType) {
      return res.status(404).json({ message: 'ServiceType not found' });
    }
    res.json(serviceType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a ServiceType by ID
exports.updateServiceType = async (req, res) => {
  try {
    const serviceType = await ServiceType.findByPk(req.params.id);
    if (!serviceType) {
      return res.status(404).json({ message: 'ServiceType not found' });
    }
    await serviceType.update(req.body);
    res.json(serviceType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a ServiceType by ID
exports.deleteServiceType = async (req, res) => {
  try {
    const serviceType = await ServiceType.findByPk(req.params.id);
    if (!serviceType) {
      return res.status(404).json({ message: 'ServiceType not found' });
    }
    await serviceType.destroy();
    res.json({ message: 'ServiceType deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
