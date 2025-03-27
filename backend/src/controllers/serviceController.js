// controllers/serviceController.js
const express = require('express');
const { ServiceProvider, Service, ServiceType } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize'); // Added for Sequelize.col

exports.matchServiceProviders = async (req, res) => {
  try {
    // Expected query parameters: serviceType, date, time, customerLocation
    const { serviceType, date, time, customerLocation } = req.query;
    if (!serviceType || !date || !time || !customerLocation) {
      return res.status(400).json({ 
        message: 'Missing required query parameters: serviceType, date, time, and customerLocation' 
      });
    }

    // Find providers that are booked at the specified date and time
    const bookedProviders = await Service.findAll({
      where: { date, time },
      attributes: ['spID']
    });
    const bookedSpIDs = bookedProviders.map(bp => bp.spID);

    // Query available providers (those not booked at that time)
    const availableProviders = await ServiceProvider.findAll({
      where: {
        spID: { [Op.notIn]: bookedSpIDs }
      }
    });

    // For simplicity, assume all available providers offer the requested serviceType.
    // In a real app, you might filter based on service offerings.

    // Calculate a score for each provider based on location, rating, and price.
    // Weights: 0.4 for location, 0.3 for rating, and 0.3 for price.
    const scoredProviders = availableProviders.map(provider => {
      let score = 0;

      // Location match (simple case-insensitive equality)
      if (provider.address.toLowerCase() === customerLocation.toLowerCase()) {
        score += 0.4;
      }

      // Normalize rating (assuming max rating is 5)
      score += (provider.rating / 5) * 0.3;

      // Price: lower price is better.
      // Avoid division by zero.
      if (provider.basePrice && provider.basePrice > 0) {
        score += (1 / provider.basePrice) * 0.3;
      }

      return { provider, score };
    });

    // Sort providers by score (highest first)
    scoredProviders.sort((a, b) => b.score - a.score);

    // Return the sorted list with key details
    const result = scoredProviders.map(item => ({
      spID: item.provider.spID,
      name: item.provider.name,
      address: item.provider.address,
      rating: item.provider.rating,
      basePrice: item.provider.basePrice,
      score: item.score
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Book a service (by a customer)
// Expected payload: { customerID, serviceType, date, time, [description] }
exports.bookService = async (req, res) => {
  try {
    const { customerID, serviceType, date, time, description } = req.body;

    // Validate required fields
    if (!customerID || !serviceType || !date || !time) {
      return res.status(400).json({ 
        message: 'Missing required fields: customerID, serviceType, date, and time are required.' 
      });
    }

    // Create a new service booking. Note that spID (service provider) is left null,
    // assuming that assignment will happen later or by another process.
    const newService = await Service.create({
      customerID,
      serviceType,
      date,
      time,
      description: description || null,
    });

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new service
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      attributes: {
        include: [
          [Sequelize.col('ServiceType.ServiceProvider.name'), 'providerName'],
          [Sequelize.col('ServiceType.ServiceProvider.category'), 'providerCategory']
        ]
      },
      include: [
        {
          model: ServiceType,
          attributes: [], // Do not include ServiceType attributes in the output
          include: [
            {
              model: ServiceProvider,
              attributes: [] // Do not include full ServiceProvider object in the output
            }
          ]
        }
      ],
      order: [['serviceID', 'ASC']]  // This ensures the services are returned in ascending order by serviceID.
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single service by ID with flattened ServiceProvider details
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id, {
      attributes: {
        include: [
          [Sequelize.col('ServiceType.ServiceProvider.name'), 'providerName'],
          [Sequelize.col('ServiceType.ServiceProvider.category'), 'providerCategory']
        ]
      },
      include: [
        {
          model: ServiceType,
          attributes: [], // Exclude ServiceType details
          include: [
            {
              model: ServiceProvider,
              attributes: [] // Exclude full ServiceProvider object
            }
          ]
        }
      ]
    });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await service.update(req.body);
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await service.destroy();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};