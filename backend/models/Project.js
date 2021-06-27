const mongoose = require('mongoose');

const projectDataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type:{
    type: String,
  },
  position: {
    type: Object
  },
  data: {
    type: Object
  },
  animated: {
    type: Boolean
  },
  arrowHeadType: {
    type: String
  },
  source: {
    type: String
  },
  target: {
    type: String
  },
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
