// This script initializes the database with sample data
// Run it with: node app/utils/initDb.js

import fetch from 'node-fetch';

async function initializeDatabase() {
  try {
    console.log('Initializing database with sample data...');
    
    const response = await fetch('http://localhost:3000/api/init?key=initialize-database-secret');
    const data = await response.json();
    
    if (data.success) {
      console.log('Database initialized successfully!');
    } else {
      console.error('Failed to initialize database:', data.message);
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();
