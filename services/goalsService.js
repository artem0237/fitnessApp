const fs = require('fs');
const path = require('path');
const goalsFilePath = path.join(__dirname, '../data/goals.json');

if (!fs.existsSync(goalsFilePath)) {
  fs.writeFileSync(goalsFilePath, JSON.stringify([], null, 2));
}

const goalService = {
  getAllGoals: (options = {}) => {
    try {
      const data = fs.readFileSync(goalsFilePath, 'utf8');
      if (!data.trim()) {
        return [];
      }
      const goals = JSON.parse(data);
      if (options.activeOnly) {
        return goals.filter(goal => goal.status === 'active');
      }
      return goals;
    } catch (error) {
      console.error('Error reading goals.json:', error);
      return [];
    }
  },

  getGoalById: (id) => {
    const goals = goalService.getAllGoals();
    return goals.find((goal) => goal.id === id);
  },

  createGoal: (newGoal) => {
    const goals = goalService.getAllGoals();
    goals.push(newGoal);
    fs.writeFileSync(goalsFilePath, JSON.stringify(goals, null, 2));
  },

  updateGoal: (id, updatedGoal) => {
    const goals = goalService.getAllGoals();
    const index = goals.findIndex((goal) => goal.id === id);
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updatedGoal };
      fs.writeFileSync(goalsFilePath, JSON.stringify(goals, null, 2));
    }
  },

  deleteGoal: (id) => {
    const goals = goalService.getAllGoals();
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    fs.writeFileSync(goalsFilePath, JSON.stringify(updatedGoals, null, 2));
  },
};

module.exports = goalService;