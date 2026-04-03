import { useReducer, useCallback } from 'react';
import { ACHIEVEMENTS } from '../utils/constants';
import { weekSpentByCategory } from '../utils/helpers';

const initialState = {
  expenses: [],
  incomes: [],
  goals: [],
  budgets: {},
  totalXP: 0,
  overspendDeductOn: false,
  earnedAchievements: [],
  weeklyBonusGiven: false,
  monthlyBonusGiven: false,
  goalMilestones: {},
  toast: null,
  pendingDeduct: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_EXPENSE': {
      const expenses = [action.payload, ...state.expenses];
      return { ...state, expenses, totalXP: state.totalXP + 10 };
    }
    case 'ADD_INCOME': {
      const incomes = [action.payload, ...state.incomes];
      return { ...state, incomes, totalXP: state.totalXP + 15 };
    }
    case 'ADD_GOAL': {
      const goals = [...state.goals, action.payload];
      return { ...state, goals, totalXP: state.totalXP + 25 };
    }
    case 'SET_BUDGET': {
      const budgets = { ...state.budgets, [action.payload.category]: action.payload.limit };
      return { ...state, budgets, totalXP: state.totalXP + 20 };
    }
    case 'TOGGLE_OVERSPEND':
      return { ...state, overspendDeductOn: !state.overspendDeductOn };
    case 'EARN_ACHIEVEMENT': {
      if (state.earnedAchievements.includes(action.payload)) return state;
      const ach = ACHIEVEMENTS.find((a) => a.id === action.payload);
      return {
        ...state,
        earnedAchievements: [...state.earnedAchievements, action.payload],
        totalXP: state.totalXP + ach.xp,
      };
    }
    case 'SET_WEEKLY_BONUS':
      return { ...state, weeklyBonusGiven: true };
    case 'SET_MONTHLY_BONUS':
      return { ...state, monthlyBonusGiven: true };
    case 'SET_GOAL_MILESTONE':
      return { ...state, goalMilestones: { ...state.goalMilestones, [action.payload]: true } };
    case 'DEDUCT_FROM_SAVINGS': {
      let remaining = action.payload;
      const goals = state.goals.map((g) => {
        if (remaining <= 0) return g;
        const take = Math.min(g.saved, remaining);
        remaining = +(remaining - take).toFixed(2);
        return { ...g, saved: +(g.saved - take).toFixed(2) };
      });
      return { ...state, goals, pendingDeduct: null };
    }
    case 'SET_PENDING_DEDUCT':
      return { ...state, pendingDeduct: action.payload };
    case 'CLEAR_PENDING_DEDUCT':
      return { ...state, pendingDeduct: null };
    case 'SET_TOAST':
      return { ...state, toast: action.payload };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    default:
      return state;
  }
}

export function useAppState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showToast = useCallback((message, color = '#7F77DD') => {
    dispatch({ type: 'SET_TOAST', payload: { message, color } });
    setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 2500);
  }, []);

  const earnAchievement = useCallback((id) => {
    if (state.earnedAchievements.includes(id)) return;
    dispatch({ type: 'EARN_ACHIEVEMENT', payload: id });
    const ach = ACHIEVEMENTS.find((a) => a.id === id);
    setTimeout(() => showToast(`Achievement: ${ach.name} +${ach.xp} XP`, '#534AB7'), 400);
  }, [state.earnedAchievements, showToast]);

  const checkAchievements = useCallback((nextState) => {
    const { expenses, incomes, goals, budgets, weeklyBonusGiven, monthlyBonusGiven, goalMilestones } = nextState || state;
    const ws = weekSpentByCategory(expenses);

    if (expenses.length >= 1) earnAchievement('first_exp');
    if (incomes.length >= 1) earnAchievement('first_inc');
    if (goals.length >= 1) earnAchievement('first_goal');
    if (Object.keys(budgets).length >= 1) earnAchievement('first_budget');
    if (expenses.length >= 3 && !weeklyBonusGiven) {
      dispatch({ type: 'SET_WEEKLY_BONUS' });
      earnAchievement('week3');
    }
    if (expenses.length >= 10 && !monthlyBonusGiven) {
      dispatch({ type: 'SET_MONTHLY_BONUS' });
      earnAchievement('month10');
    }
    Object.keys(budgets).forEach((cat) => {
      if ((ws[cat] || 0) <= budgets[cat]) earnAchievement('under_budget');
    });
    goals.forEach((g, i) => {
      if (g.saved >= g.target && !goalMilestones[`done_${i}`]) {
        dispatch({ type: 'SET_GOAL_MILESTONE', payload: `done_${i}` });
        earnAchievement('goal_done');
      }
    });
  }, [state, earnAchievement]);

  const checkBudgetOverspend = useCallback((category) => {
    if (!state.budgets[category]) return;
    const ws = weekSpentByCategory(state.expenses);
    const spent = ws[category] || 0;
    const limit = state.budgets[category];
    if (spent > limit) {
      const over = +(spent - limit).toFixed(2);
      if (state.overspendDeductOn) {
        dispatch({ type: 'DEDUCT_FROM_SAVINGS', payload: over });
        showToast(`${over.toFixed(2)} removed from savings (${category} overspend)`, '#D85A30');
      } else {
        dispatch({ type: 'SET_PENDING_DEDUCT', payload: { over, category } });
      }
    }
  }, [state, showToast]);

  const addExpense = useCallback((expense) => {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
    showToast('+10 XP — expense logged');
    setTimeout(() => {
      checkAchievements();
      checkBudgetOverspend(expense.category);
    }, 50);
  }, [showToast, checkAchievements, checkBudgetOverspend]);

  const addIncome = useCallback((income) => {
    dispatch({ type: 'ADD_INCOME', payload: income });
    showToast('+15 XP — income added', '#378ADD');
    setTimeout(() => checkAchievements(), 50);
  }, [showToast, checkAchievements]);

  const addGoal = useCallback((goal) => {
    dispatch({ type: 'ADD_GOAL', payload: goal });
    showToast('+25 XP — goal created', '#1D9E75');
    setTimeout(() => checkAchievements(), 50);
  }, [showToast, checkAchievements]);

  const setBudget = useCallback((category, limit) => {
    dispatch({ type: 'SET_BUDGET', payload: { category, limit } });
    showToast('+20 XP — budget set');
    setTimeout(() => checkAchievements(), 50);
  }, [showToast, checkAchievements]);

  const confirmDeductSavings = useCallback(() => {
    if (state.pendingDeduct) {
      dispatch({ type: 'DEDUCT_FROM_SAVINGS', payload: state.pendingDeduct.over });
      showToast(`${state.pendingDeduct.over.toFixed(2)} removed from savings`, '#D85A30');
    }
  }, [state.pendingDeduct, showToast]);

  const toggleOverspend = useCallback(() => {
    dispatch({ type: 'TOGGLE_OVERSPEND' });
    showToast(
      state.overspendDeductOn ? 'Auto-deduct OFF' : 'Auto-deduct ON',
      state.overspendDeductOn ? '#888780' : '#D85A30'
    );
  }, [state.overspendDeductOn, showToast]);

  return {
    state,
    dispatch,
    addExpense,
    addIncome,
    addGoal,
    setBudget,
    toggleOverspend,
    confirmDeductSavings,
    showToast,
  };
}
