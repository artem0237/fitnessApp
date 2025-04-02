const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalsController');

router.get('/', goalController.getAllGoals);

router.get('/new', (req, res) => {
  res.render('new', { user: req.user });
});

router.post('/', goalController.createGoal);

router.get('/:id/edit', goalController.getGoalById);

router.post('/:id', goalController.updateGoal);

router.post('/:id/delete', goalController.deleteGoal);

module.exports = router;