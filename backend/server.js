require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require('./middleware/logger');
const errorHandle = require('./middleware/errorHandler');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const corsOptions = require('./configs/corsOptions');
const connectDb = require('./configs/dbConnect');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;

// routes
const rootRoutes = require('./routes/root');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

connectDb();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', rootRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use(errorHandle);

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log('connected to mongoose database');
    console.log(`server is running on port: ${PORT}`);
  })
})

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongooseDBLog.log')
})