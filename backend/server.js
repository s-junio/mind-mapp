require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connection established'));

app.use(express.json());

/* Routes */
const projectsRouter = require('./routes/projects');
const authRouter = require('./routes/auth');

app.use('/projects', projectsRouter);
app.use('/auth', authRouter);

app.listen(process.env.SERVICE_PORT);
