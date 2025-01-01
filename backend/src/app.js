const express = require('express');
const cors = require('cors');
const DatabaseRoutes = require('./routes/DatabaseRoutes');
const DosenRoutes = require('./routes/DosenRoutes');
const app = express();

// Mengaktifkan CORS
app.use(cors());

// Middleware untuk mengurai JSON
app.use(express.json());

app.use('/api',
    DatabaseRoutes,
    DosenRoutes
);

module.exports = app;
