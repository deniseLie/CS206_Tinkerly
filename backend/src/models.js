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
  category: {
    type: DataTypes.STRING,
  },
  distance: {
    type: DataTypes.FLOAT,
    defaultValue: 1,
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
  extraRequirement: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  finalPrice: {
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

const Payment = sequelize.define('Payment', {
  paymentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  paymentType: {
    type: DataTypes.TEXT,
  },
  paymentDescription: {
    type: DataTypes.TEXT,
  },
  paymentIsDefault: {
    type: DataTypes.BOOLEAN,
  },
}, {
  tableName: 'payment',
  timestamps: false,
});

const ServiceType = sequelize.define('ServiceType', {
  typeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.TEXT,
  },
  basePrice: {
    type: DataTypes.FLOAT,
  },
  consultPrice: {
    type: DataTypes.FLOAT,
  },
}, {
  tableName: 'service_types',
  timestamps: false,
});

// =======================
// Associations
// =======================

Service.belongsTo(ServiceType, { foreignKey: 'typeID' });
ServiceType.hasMany(Service, { foreignKey: 'typeID' });

ServiceType.belongsTo(ServiceProvider, {foreignKey: 'spID'})
ServiceProvider.hasMany(ServiceType, {foreignKey: 'spID'})
// ServiceType.belongsTo(ServiceProvider, { foreignKey: 'spID', as: 'ServiceProvider' });
// ServiceProvider.hasMany(ServiceType, { foreignKey: 'spID', as: 'ServiceTypes' });

// A Service is requested by one Customer
Service.belongsTo(Customer, { foreignKey: 'customerID' });
Customer.hasMany(Service, { foreignKey: 'customerID' });

// A ServiceReview is associated with a Service
ServiceReview.belongsTo(Service, { foreignKey: 'serviceID' });
Service.hasOne(ServiceReview, { foreignKey: 'serviceID' });

Customer.hasMany(Payment, { foreignKey: 'customerID' });
Payment.belongsTo(Customer, { foreignKey: 'customerID' });

// Service.beforeCreate(async (service, options) => {
//   if (service.typeID) {
//     // Get the associated ServiceType along with its ServiceProvider
//     const serviceType = await sequelize.models.ServiceType.findByPk(service.typeID, {
//       include: [{
//         model: sequelize.models.ServiceProvider,
//         as: 'ServiceProvider' // Alias if defined in association, or leave out if not using alias.
//       }]
//     });
//     if (serviceType) {
//       const basePrice = serviceType.basePrice || 0;
//       const consultPrice = serviceType.consultPrice || 0;
//       let providerDistance = 0;
      
//       // Try to get the distance from the included ServiceProvider
//       if (serviceType.ServiceProvider) {
//         providerDistance = serviceType.ServiceProvider.distance || 0;
//       } else if (serviceType.spID) {
//         // If the association wasn't included, fetch the provider manually.
//         const provider = await sequelize.models.ServiceProvider.findByPk(serviceType.spID);
//         providerDistance = provider ? provider.distance || 0 : 0;
//       }
      
//       let distanceCost = providerDistance * 2.5;
//       if (distanceCost > 30) distanceCost = 30;

//       // Compute finalPrice using the formula:
//       service.finalPrice = basePrice + consultPrice + distanceCost;
      
//     }
//   }
// });

// =======================
// Export models and connection
// =======================
module.exports = {
  sequelize,
  Customer,
  ServiceProvider,
  Service,
  ServiceReview,
  ServiceType,
  Payment
};

// Sync models with the database
sequelize.sync({ alter: true }) // Use { force: true } to drop & recreate tables
  .then(() => {
    console.log('All models are synchronized with Supabase!');
  })
  .catch(err => {
    console.error('Error syncing models:', err);
  });
