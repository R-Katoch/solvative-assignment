const deepmerge = require('deepmerge');
const userSwagger = require('./docs/userSwagger.json');
const tipSwagger = require('./docs/tipSwagger.json');

// Base Swagger document structure
const baseSwagger = {
  openapi: '3.0.0',
  info: {
    title: 'Bitespeed Backend Task: Identity Reconciliation',
    version: '1.0.0',
    description: 'API Documentation for Bitespeed Backend Task: Identity Reconciliation',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local Server',
    },
  ],
};

const combinedSwagger = deepmerge.all([
  baseSwagger,
  userSwagger,
  tipSwagger,
]);

module.exports = {
  combinedSwagger,
};
