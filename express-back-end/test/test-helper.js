const { MongoMemoryServer } = require('mongodb-memory-server');
const db = require('../src/db');

const server = new MongoMemoryServer();
/*
 * Creates and/or connects to a mongo test database in memory
 * @returns {void}
 */
const createDB = async () => {
  db.disconnect(); // Disconnect from main db
  const url = await server.getConnectionString();
  db.connect(url);
};

/*
 * Disconnects from and destroys the mongo test database in memory
 * @returns {void}
 */
const destroyDB = () => {
  db.disconnect();
};

module.exports = {
  createDB,
  destroyDB,
};
