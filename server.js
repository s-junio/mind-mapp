require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connection established'));

app.use(express.json());

/* Routes */
const projectsRouter = require('./backend/routes/projects');
const authRouter = require('./backend/routes/auth');

app.use('/api/projects', projectsRouter);
app.use('/api/auth', authRouter);

// start https server
let sslOptions = {
  key: fs.readFileSync('./textmapp-key.pem'),
  cert: fs.readFileSync('./textmapp.pem'),
};

https.createServer(sslOptions, app).listen(process.env.SERVICE_PORT);
