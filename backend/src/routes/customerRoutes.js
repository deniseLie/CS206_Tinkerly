// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Create a new customer
router.post('/', customerController.createCustomer);

// Get all customers
router.get('/', customerController.getCustomers);

// Get a single customer by ID
router.get('/:id', customerController.getCustomerById);

// Update a customer by ID
router.put('/:id', customerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', customerController.deleteCustomer);

router.get('/:id/payments', customerController.getCustomerPayments);

module.exports = router;
