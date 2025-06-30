const express = require('express');
const cors = require('cors');
const path = require('path');

const proposalRoutes = require('./routes/proposalRoutes');

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/proposal', proposalRoutes);

module.exports = app;
