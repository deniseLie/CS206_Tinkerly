// Load environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Ensure this points to the correct location

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceReviewRoutes = require('./routes/serviceReviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const serviceTypeRoutes = require('./routes/serviceTypeRoutes');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Mount routes
app.use('/customers', customerRoutes);
app.use('/service-providers', serviceProviderRoutes);
app.use('/services', serviceRoutes);
app.use('/service-reviews', serviceReviewRoutes);
app.use('/payments', paymentRoutes);
app.use('/service-types', serviceTypeRoutes);

// Define the port (default to 3000)
const PORT = process.env.PORT || 3000;

// Test database connection and sync models with Supabase
sequelize.authenticate()
  .then(() => {
    console.log('Connected to Supabase PostgreSQL.');
    return sequelize.sync({ alter: true }); // Sync models (does NOT delete data)
  })
  .then(() => {
    console.log('Database models synced with Supabase.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to Supabase:', err);
  });
