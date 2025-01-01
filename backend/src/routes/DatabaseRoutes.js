const express = require('express');
const router = express.Router();
const DatabaseController = require('../controllers/DatabaseController');


router.get('/db', DatabaseController.connDB);

module.exports = router;
