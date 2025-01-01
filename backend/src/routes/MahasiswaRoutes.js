const express = require('express');
const router = express.Router();
const MahasiswaController = require('../controllers/MahasiswaController');

router.get('/mahasiswa', MahasiswaController.getMahasiswa);

router.post('/mahasiswa', MahasiswaController.insertMahasiswa);

router.put('/mahasiswa', MahasiswaController.updateMahasiswa);

router.delete('/mahasiswa', MahasiswaController.deleteMahasiswa);

module.exports = router;
