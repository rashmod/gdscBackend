const express = require('express');
const router = express.Router();

const { getEvents, addEvent, deleteEvents } = require('../controllers/events');

router.route('/').get(getEvents).post(addEvent);

router.route('/:id').delete(deleteEvents);

module.exports = router;
