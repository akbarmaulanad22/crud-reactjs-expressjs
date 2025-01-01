const express = require('express');
const router = express.Router();
const PenelitianController = require('../controllers/PenelitianController');

router.get('/penelitian', PenelitianController.getPenelitian);

router.post('/penelitian', PenelitianController.insertPenelitian);

router.put('/penelitian', PenelitianController.updatePenelitian);

router.delete('/penelitian', PenelitianController.deletePenelitian);

module.exports = router;
