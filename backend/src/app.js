const express = require('express');
const cors = require('cors');
const DatabaseRoutes = require('./routes/DatabaseRoutes');
const DosenRoutes = require('./routes/DosenRoutes');
const MahasiswaRoutes = require('./routes/MahasiswaRoutes');
const PenelitianRoutes = require('./routes/PenelitianRoutes');
const PenelitianAnggotaRoutes = require('./routes/PenelitianAnggotaRoutes');
const PenelitianDokumenRoutes = require('./routes/PenelitianDokumenRoutes');
const PenelitianLogRoutes = require('./routes/PenelitianLogRoutes');
const app = express();

// Mengaktifkan CORS
app.use(cors());

// Middleware untuk mengurai JSON
app.use(express.json());

app.use('/api',
    DatabaseRoutes,
    DosenRoutes,
    MahasiswaRoutes,
    PenelitianRoutes,
    PenelitianAnggotaRoutes,
    PenelitianDokumenRoutes,
    PenelitianLogRoutes
);

module.exports = app;
