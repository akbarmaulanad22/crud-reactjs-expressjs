const express = require('express');
const router = express.Router();
const PenelitianLogController = require('../controllers/PenelitianLogController');

router.get('/penelitian-log', PenelitianLogController.getPenelitianLog);

router.post('/penelitian-log', PenelitianLogController.insertPenelitianLog);

router.put('/penelitian-log', PenelitianLogController.updatePenelitianLog);

router.delete('/penelitian-log', PenelitianLogController.deletePenelitianLog);

module.exports = router;
