require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,     // Your Supabase database name
  process.env.DB_USER,     // Your Supabase user
  process.env.DB_PASS,     // Your Supabase password
  {
    host: process.env.DB_HOST,  // Your Supabase host (e.g., db.supabase.co)
    dialect: 'postgres',        // Supabase uses PostgreSQL
    port: process.env.DB_PORT,  // Typically 5432
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Use false if needed during development
      },
    },
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to Supabase PostgreSQL has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
