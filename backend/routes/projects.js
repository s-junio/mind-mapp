const router = require('express').Router();
const auth = require('../tokenCheck');

const Project = require('../models/Project');
const User = require('../models/User');
//Gettings all projects
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const projectIds = user.projects;
    await Project.find({ _id : { $in : projectIds } }, { title: -1, modified: -1 })
      .sort({ modified: -1 })
      .exec(function (err, collectionItems) {
        res.json(collectionItems);
        if (err) res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  const project = new Project({
    title: req.body.title,
    data: req.body.data,
  });

  try {
    const newProject = await project.save();
    User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { projects: newProject._id } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400);
  }
});

router.get('/:id', auth, getProject, (req, res) => {
  res.send(res.project);
});

router.delete('/:id', auth, getProject, async (req, res) => {
  console.log('calling!!!!!!!!1')
  try {
    User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { projects: res.project._id } },
      async function (error, success) {
        if (error) {
          res.status(500).json({ message: error.message });
        } else {
          await res.project.remove();
          res.json({ message: 'Project deleted' });
        }
      }
    );
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
