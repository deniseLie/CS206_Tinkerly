// controllers/customerController.js
const { Customer, Payment } = require('../models');

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    await customer.update(req.body);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    await customer.destroy();
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerPayments = async (req, res) => {
  try {
    const customerId = req.params.id; // Expect customer id in the URL, e.g., /customers/1/payments
    const customer = await Customer.findByPk(customerId, {
      include: Payment // This will include all Payment records associated with the Customer
    });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer.Payments); // By default, Sequelize will attach payments in the association alias "Payments"
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};