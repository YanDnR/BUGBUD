export const RANKS = [
  { name: 'Saver Novice', xp: 0 },
  { name: 'Budget Starter', xp: 125 },
  { name: 'Money Tracker', xp: 300 },
  { name: 'Savings Keeper', xp: 600 },
  { name: 'Finance Pro', xp: 1000 },
  { name: 'Wealth Builder', xp: 1500 },
  { name: 'Master Saver', xp: 2200 },
];

export const ACHIEVEMENTS = [
  { id: 'first_exp', icon: '📝', name: 'First log', desc: 'Log your first expense', xp: 10 },
  { id: 'first_inc', icon: '💰', name: 'First paycheck', desc: 'Log your first income', xp: 15 },
  { id: 'first_goal', icon: '🎯', name: 'Goal setter', desc: 'Create a savings goal', xp: 25 },
  { id: 'first_budget', icon: '📊', name: 'Budget maker', desc: 'Set a weekly budget', xp: 20 },
  { id: 'under_budget', icon: '✅', name: 'Under budget', desc: 'Stay under a weekly limit', xp: 40 },
  { id: 'week3', icon: '🔥', name: 'Weekly habit', desc: 'Log 3 expenses in a week', xp: 50 },
  { id: 'month10', icon: '📅', name: 'Monthly tracker', desc: 'Log 10 expenses in a month', xp: 100 },
  { id: 'goal_done', icon: '🏆', name: 'Goal crusher', desc: 'Complete a savings goal', xp: 200 },
];

export const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other'];
export const INCOME_TYPES = ['Salary', 'Freelance', 'Gift', 'Side hustle', 'Investment', 'Other'];

export const CAT_COLORS = {
  Food: '#1D9E75',
  Transport: '#378ADD',
  Shopping: '#D4537E',
  Bills: '#BA7517',
  Health: '#7F77DD',
  Entertainment: '#D85A30',
  Other: '#888780',
};

export const INC_COLORS = {
  Salary: '#185FA5',
  Freelance: '#1D9E75',
  Gift: '#D4537E',
  'Side hustle': '#BA7517',
  Investment: '#534AB7',
  Other: '#888780',
};
