const goalService = require('../services/goalsService');

const goalController = {
  getAllGoals: (req, res) => {
    const activeOnly = req.query.activeOnly === 'true';
    const goals = goalService.getAllGoals({ activeOnly });
    res.render('goals', { goals, activeOnly, user: req.user });
  },

  createGoal: (req, res) => {
    const { title, type, target_value, starting_value, units, deadline } = req.body;
    const newGoal = {
      id: `goal_${Date.now()}`,
      title,
      type,
      target_value: parseFloat(target_value),
      starting_value: parseFloat(starting_value),
      units,
      deadline: deadline || null,
      current_progress: parseFloat(starting_value),
      status: 'active',
      created_date: new Date().toISOString().split('T')[0],
      progress_history: [],
    };
    goalService.createGoal(newGoal);
    res.redirect('/goals');
  },

  getGoalById: (req, res) => {
    const goal = goalService.getGoalById(req.params.id);
    if (!goal) {
      return res.status(404).send('Goal not found');
    }
    res.render('edit', { goal, user: req.user });
  },

  updateGoal: (req, res) => {
    const { title, type, target_value, starting_value, units, current_progress, deadline, status } = req.body;
    const updatedGoal = {
      title,
      type,
      target_value: parseFloat(target_value),
      starting_value: parseFloat(starting_value),
      units,
      current_progress: parseFloat(current_progress),
      deadline: deadline || null,
      status: status === 'active' ? 'active' : 'inactive',
    };
    goalService.updateGoal(req.params.id, updatedGoal);
    res.redirect('/goals');
  },

  deleteGoal: (req, res) => {
    goalService.deleteGoal(req.params.id);
    res.redirect('/goals');
  },
};

module.exports = goalController;