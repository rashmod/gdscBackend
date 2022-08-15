const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'Please add a name'],
	},
	location: {
		type: String,
		trim: true,
		required: [true, 'Please add a location'],
	},
	category: {
		type: String,
		trim: true,
		required: [true, 'Please add a category'],
	},
	// createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);
