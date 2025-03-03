// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceReviewRoutes = require('./routes/serviceReviewRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Route mappings
app.use('/customers', customerRoutes);
app.use('/service-providers', serviceProviderRoutes);
app.use('/services', serviceRoutes);
app.use('/service-reviews', serviceReviewRoutes);

// Test DB connection and start the server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch(err => console.error('Error connecting to the database:', err));