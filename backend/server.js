require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const app = express();


connectDB();

//  This is for Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json());

//  This is for Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/events', require('./routes/events'));

app.use(errorHandler);


app.get('/', (req, res) => res.send('SRMS Backend API Running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));