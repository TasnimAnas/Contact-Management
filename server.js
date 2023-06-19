const express = require('express');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');

// connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
app.use(express.json());
app.use('/api/contacts', require('./routes/contact_routes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use((req, res) => {
    res.status(404).json({ message: 'Not found bro' });
  });
app.use(errorHandler);
