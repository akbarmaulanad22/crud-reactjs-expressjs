const express = require('express');
const router = express.Router();
const PenelitianDokumenController = require('../controllers/PenelitianDokumenController');

router.get('/penelitian-dokumen', PenelitianDokumenController.getPenelitianDokumen);

router.post('/penelitian-dokumen', PenelitianDokumenController.insertPenelitianDokumen);

router.put('/penelitian-dokumen', PenelitianDokumenController.updatePenelitianDokumen);

router.delete('/penelitian-dokumen', PenelitianDokumenController.deletePenelitianDokumen);

module.exports = router;
