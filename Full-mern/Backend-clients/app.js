const express = require('express');
const connectDB = require('./config/db');
const clientRoutes = require('./routes/clientRoutes'); 
const reservationRoutes = require('./routes/reservationRoutes'); 

const app = express();
const PORT = 5000;

app.use(express.json());

const cors = require('cors');
app.use(cors());

connectDB();

app.use('/api', clientRoutes);
app.use('/api', reservationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
