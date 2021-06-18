const router = require('express').Router();
const auth = require('../tokenCheck');

const Project = require('../models/Project');
//Gettings all projects
router.get('/', auth, async (req, res) => {
  console.log('calling get projects');
  try {
    const projects = await Project.find(null, { title: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const project = new Project({
    title: req.body.title,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400);
  }
});

router.get('/:id', getProject, (req, res) => {
  res.send(res.project);
});

router.delete('/:id', getProject, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (project === null) {
      return res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.project = project;
  next();
}

module.exports = router;
