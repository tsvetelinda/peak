const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mountainRoutes = require('./routes/mountains');
const userRoutes = require('./routes/users');

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
    origin: ['https://tsvetelinda.github.io', 'http://localhost:4200'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/mountains', mountainRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
