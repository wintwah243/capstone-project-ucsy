const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

const articleRoutes = require('./routes/articleRoutes');
app.use('/api/articles', articleRoutes);

const checklistRoutes = require('./routes/checklistRoutes');
app.use('/api/checklists', checklistRoutes);

app.get('/', (req, res) => {
  res.send('Flood Awareness Platform Backend is working');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Database connected'))
  .catch((err) => console.error('Database connection failed', err));

// Server 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});