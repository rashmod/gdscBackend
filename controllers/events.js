const Event = require('../models/Event');
const APIFeatures = require('../utils/APIFeatures');

// @desc Get all events
// @route GET /api/events?category=movie
// @access Public
exports.getEvents = async (req, res, next) => {
	try {
		const resPerPage = 8;
		const eventCount = await Event.countDocuments();

		const apiFeatures = new APIFeatures(Event.find(), req.query)
			.search()
			.filter()
			.pagination(resPerPage);

		const events = await apiFeatures.query;

		return res.status(200).json({
			success: true,
			totalEvents: eventCount,
			count: events.length,
			resPerPage,
			data: events,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};

// @desc Add events
// @route POST /api/events
// @access Public
exports.addEvent = async (req, res, next) => {
	try {
		const event = await Event.create(req.body);

		return res.status(201).json({
			success: true,
			data: event,
		});
	} catch (error) {
		if (error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map(
				(val) => val.message
			);
			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: 'Server Error',
			});
		}
	}
};

// @desc Delete events
// @route DELETE /api/events
// @access Public
exports.deleteEvents = async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.id);

		if (!event) {
			return res.status(404).json({
				success: false,
				error: 'No event found',
			});
		}

		await event.remove();

		return res.status(200).json({
			success: true,
			data: {},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};
