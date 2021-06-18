const mongoose = require('mongoose');

const projectDataSchema = new mongoose.Schema({
  coords: {
    type: String
  }
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  modified: { type: Date, default: Date.now },
  data: [projectDataSchema]
});

module.exports = mongoose.model('Project', projectSchema);
