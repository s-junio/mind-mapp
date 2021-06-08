const router = require('express').Router();
const Projects = require('../models/projects');
//Gettings all projects
router.get('/', async (req, res) => {
  console.log('calling');
  try {
    const projects = await Projects.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', (req, res) => {});

module.exports = router;
