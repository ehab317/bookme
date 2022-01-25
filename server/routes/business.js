const express = require('express');
const router = express.Router();

const {loadBusinesses, insertBusinesses, deleteBusinesses} = require('../controllers/business');

router.post('/business/load', loadBusinesses);
router.post('/business/insert', insertBusinesses);
router.post('/business/delete', deleteBusinesses);


module.exports = router;
