const express = require('express');
const router = express.Router();

const {insertEvent, loadEvents, editEvent, deleteEvent, loadUserEvents} = require('../controllers/events');

router.post('/event/insert', insertEvent);
router.post('/event/load', loadEvents);
router.post('/event/edit', editEvent);
router.post('/event/delete', deleteEvent);
router.post('/event/loadbyuser', loadUserEvents);

module.exports = router;