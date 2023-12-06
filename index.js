//Import framework
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const db = require('./src/config/connection.js');
const route = require('./src/routes/index.js');
const app = express();
dotenv.config();

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cookieParser());
//Connected to database
db.connect();

//Router
app.use('/api/v1', route);

//Static files
app.use('/api/v1', express.static(path.join(__dirname, 'public')));

//App listen
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
})