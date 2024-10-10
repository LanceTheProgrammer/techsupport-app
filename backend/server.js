const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with better error handling
const connectDB = async () => {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('MongoDB connection string is not defined in environment variables');
      }
      
      console.log('Attempting to connect to MongoDB...');
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error('MongoDB connection error:');
      console.error('Error message:', error.message);
      if (error.codeName) {
        console.error('Error code:', error.code);
        console.error('Error codeName:', error.codeName);
      }
      process.exit(1);
    }
  };

connectDB();

// Service Model
const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  estimatedTime: String,
  category: String
});

const Service = mongoose.model('Service', serviceSchema);

// Booking Model
const bookingSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  customerName: String,
  email: String,
  phone: String,
  preferredDate: Date,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));