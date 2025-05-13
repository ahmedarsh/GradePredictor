const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const fileRoutes = require('./routes/fileRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(fileUpload());
app.use(express.json());

// Routes
app.use('/api/files', fileRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
