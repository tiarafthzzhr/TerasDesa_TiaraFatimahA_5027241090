const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/terasdesa')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'TerasDesa API Server',
    status: 'running',
    version: '1.0.0'
  });
});

// Routes (akan di-uncomment setelah file routes dibuat)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));


// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Server Error' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});