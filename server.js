const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db.js');
const path = require('path');

const events = require('./routes/events');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/events', events);

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(`listening on port ${PORT} in ${process.env.NODE_ENV}`.white)
);
