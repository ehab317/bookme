const express = require('express');
const router = express.Router();

const { loadUnits, loadBusinessUnits, insertUnit, deleteUnit } = require('../controllers/units');

router.post('/units/load', loadUnits);
router.post('/business/units/load', loadBusinessUnits);
router.post('/unit/insert', insertUnit);
router.post('/unit/delete', deleteUnit);

module.exports = router;

