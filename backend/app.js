const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const cors = require("cors");
app.use(cors());
app.use(cookieParser());

dotenv.config({ path: './config.env' });

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

// we link the router file
app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );

app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})


