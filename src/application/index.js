const express = require('express');
require('../infrastructure/db/mongoConnection');
const planetRoutes = require('./routes/planetRoutes');
const characterRoutes = require('./routes/characterRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../../docs/doc.json');

const app = express();

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api/planets', planetRoutes);
app.use('/api/characters', characterRoutes);

module.exports = app;