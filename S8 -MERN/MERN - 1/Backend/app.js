const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 5000;

app.use(express.json());

// backend app.js
const cors = require('cors');
app.use(cors());

connectDB();

app.use('/api', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
