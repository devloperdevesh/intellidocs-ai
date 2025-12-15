const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// CORS ENABLE
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;
