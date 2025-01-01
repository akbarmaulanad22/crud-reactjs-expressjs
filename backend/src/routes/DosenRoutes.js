const express = require('express');
const router = express.Router();
const DosenController = require('../controllers/DosenController');

router.get('/dosen', DosenController.getDosen);

router.post('/dosen', DosenController.insertDosen);

router.put('/dosen', DosenController.updateDosen);

router.delete('/dosen', DosenController.deleteDosen);

module.exports = router;
