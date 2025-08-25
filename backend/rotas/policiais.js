const express = require('express');
const router = express.Router();
const policiaisController = require('../controllers/policiaisController');

router.post('/policiais', policiaisController.cadastrarPolicial);
router.get('/policiais', policiaisController.listarPoliciais);

module.exports = router;
