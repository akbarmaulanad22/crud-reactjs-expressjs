const express = require('express');
const router = express.Router();
const PenelitianAnggotaController = require('../controllers/PenelitianAnggotaController');

router.get('/penelitian-anggota', PenelitianAnggotaController.getPenelitianAnggota);

router.post('/penelitian-anggota', PenelitianAnggotaController.insertPenelitianAnggota);

router.put('/penelitian-anggota', PenelitianAnggotaController.updatePenelitianAnggota);

router.delete('/penelitian-anggota', PenelitianAnggotaController.deletePenelitianAnggota);

module.exports = router;
