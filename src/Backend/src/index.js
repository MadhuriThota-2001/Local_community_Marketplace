const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const appRouter = require('./routes/index.js');
const path = require('path');
const debug = require('debug')('app:server');

require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type'],
  }));
app.use(bodyParser.json());
app.use('/api', appRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log(path.join(__dirname, 'uploads'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  debug(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});
