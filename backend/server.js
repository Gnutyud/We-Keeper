require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require('./middleware/logger');
const errorHandle = require('./middleware/errorHandler');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require('cors');
const corsOptions = require('./configs/corsOptions');
const connectDb = require('./configs/dbConnect');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const PORT = process.env.PORT || 4000;

// routes
const rootRoutes = require('./routes/root');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

connectDb();

// Passport config
require('./configs/passport')(passport);

// middleware
app.use(logger);

app.use(cors(corsOptions));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.use(cookieParser());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.DATABASE_URI }),
  })
)

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', rootRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);
app.use('/upload', uploadRoutes);

app.use(errorHandle);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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