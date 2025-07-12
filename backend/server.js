require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Routes
// Authentication routes
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);


// Customer routes
const customerRoutes = require('./src/routes/customer');
app.use('/api/customers', customerRoutes);


// Notes routes
const notesRoutes = require('./src/routes/notes');
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});