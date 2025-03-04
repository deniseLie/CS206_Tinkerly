// const { Sequelize, DataTypes } = require('sequelize');

// // Initialize Sequelize connection (update with your DB details)
// const sequelize = new Sequelize(
//   process.env.DB_NAME || 'TinkerlyDB',
//   process.env.DB_USER || 'Admin',
//   process.env.DB_PASS || '12345678',
//   {
//     host: process.env.DB_HOST || 'localhost',
//     dialect: 'mysql',
//     port: process.env.DB_PORT || 3306,
//     dialectModule: require('mysql2'),
//   }
// );

// Load environment variables from .env file
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with Supabase PostgreSQL credentials
const sequelize = new Sequelize(
  process.env.DB_NAME, // e.g., 'postgres'
  process.env.DB_USER, // your Supabase user
  process.env.DB_PASS, // your Supabase password
  {
    host: process.env.DB_HOST, // your Supabase host, e.g., 'db.supabase.co'
    dialect: 'postgres',       // Using PostgreSQL
    port: process.env.DB_PORT, // typically 5432 for PostgreSQL
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Use false if your SSL certificate isn’t verified by a CA
      },
    },
    // Optionally, enable logging for debugging:
    // logging: console.log,
  }
);

// Test the connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to Supabase PostgreSQL has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// =======================
// Customer Model (formerly User)
// =======================
const Customer = sequelize.define('Customer', {
  customerID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  bankAccount: {
    type: DataTypes.STRING,
    // Consider storing tokens or references rather than raw bank data for security
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'customers',
  timestamps: false,
});

// =======================
// Service Provider Model
// =======================
const ServiceProvider = sequelize.define('ServiceProvider', {
  spID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  bankAccount: {
    type: DataTypes.STRING,
    // Again, consider storing tokens or secure references
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
}, {
  tableName: 'service_providers',
  timestamps: false,
});

// =======================
// Service Model
// =======================
const Service = sequelize.define('Service', {
  serviceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serviceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  basePrice: {
    type: DataTypes.FLOAT,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  time: {
    type: DataTypes.TIME,
  },
}, {
  tableName: 'services',
  timestamps: false,
});

// =======================
// Service Review Model
// =======================
const ServiceReview = sequelize.define('ServiceReview', {
  reviewID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'service_reviews',
  timestamps: false,
});

// =======================
// Associations
// =======================

// A Service is provided by one Service Provider
Service.belongsTo(ServiceProvider, { foreignKey: 'spID' });
ServiceProvider.hasMany(Service, { foreignKey: 'spID' });

// A Service is requested by one Customer
Service.belongsTo(Customer, { foreignKey: 'customerID' });
Customer.hasMany(Service, { foreignKey: 'customerID' });

// A ServiceReview is associated with a Service
ServiceReview.belongsTo(Service, { foreignKey: 'serviceID' });
Service.hasMany(ServiceReview, { foreignKey: 'serviceID' });

// A ServiceReview can be written by a Customer (if you want to capture the reviewer)
ServiceReview.belongsTo(Customer, { foreignKey: 'customerID' });
Customer.hasMany(ServiceReview, { foreignKey: 'customerID' });

// =======================
// Export models and connection
// =======================
module.exports = {
  sequelize,
  Customer,
  ServiceProvider,
  Service,
  ServiceReview,
};

// Sync models with the database
sequelize.sync({ alter: true }) // Use { force: true } to drop & recreate tables
  .then(() => {
    console.log('✅ All models are synchronized with Supabase!');
  })
  .catch(err => {
    console.error('❌ Error syncing models:', err);
  });
