require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connection established'));

app.use(express.json());

/* Routes */
const projectsRouter = require('./routes/projects');
app.get('/', (req, res) => {
  res.send('oi');
});

app.use('/projects', projectsRouter);

app.listen(process.env.SERVICE_PORT);
