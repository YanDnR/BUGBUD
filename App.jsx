import { useState } from 'react';
import { useAppState } from './hooks/useAppState';
import HomeScreen from './screens/HomeScreen';
import { IncomeScreen, ExpensesScreen, GoalsScreen, BudgetScreen } from './screens/OtherScreens';
import XpScreen from './screens/XpScreen';
import BottomNav from './components/BottomNav';
import Fab from './components/Fab';
import {
  Toast,
  AddExpenseModal,
  AddIncomeModal,
  AddGoalModal,
  SetBudgetModal,
  OverspendModal,
} from './components/UI';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [modal, setModal] = useState(null); // 'expense' | 'income' | 'goal' | 'budget'

  const {
    state,
    addExpense,
    addIncome,
    addGoal,
    setBudget,
    toggleOverspend,
    confirmDeductSavings,
    dispatch,
  } = useAppState();

  const openAdd = () => {
    const screenToModal = {
      income: 'income',
      goals: 'goal',
      budget: 'budget',
    };
    setModal(screenToModal[activeScreen] || 'expense');
  };

  const screens = {
    home: <HomeScreen state={state} />,
    income: <IncomeScreen state={state} />,
    expenses: <ExpensesScreen state={state} />,
    budget: <BudgetScreen state={state} onToggleOverspend={toggleOverspend} />,
    goals: <GoalsScreen state={state} />,
    xp: <XpScreen state={state} />,
  };

  return (
    <>
      {/* Phone shell — remove this wrapper when deploying as a real mobile app */}
      <div style={{
        maxWidth: 390,
        margin: '0 auto',
        padding: '8px 0 16px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{
          background: 'var(--color-background-secondary, #f5f5f3)',
          borderRadius: 24,
          border: '0.5px solid rgba(0,0,0,0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: 720,
        }}>
          {/* Status bar */}
          <div style={{
            background: 'var(--color-background-primary, #fff)',
            padding: '12px 20px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--color-text-secondary, #888)',
            borderBottom: '0.5px solid rgba(0,0,0,0.08)',
            flexShrink: 0,
          }}>
            <span>9:41</span>
            <span>●●●</span>
          </div>

          {/* Screen header */}
          <div style={{
            background: 'var(--color-background-primary, #fff)',
            padding: '13px 20px 11px',
            borderBottom: '0.5px solid rgba(0,0,0,0.08)',
            flexShrink: 0,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-text-primary, #111)', margin: 0 }}>
              {{
                home: 'My finances',
                income: 'Income',
                expenses: 'Expenses',
                budget: 'Weekly budget',
                goals: 'Savings goals',
                xp: 'Progress & XP',
              }[activeScreen]}
            </h2>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary, #888)', marginTop: 2 }}>
              {{
                home: 'March 2026',
                income: 'Money coming in',
                expenses: 'Track your spending',
                budget: 'Set limits per category',
                goals: "What you're saving toward",
                xp: 'Your saving journey',
              }[activeScreen]}
            </p>
          </div>

          {/* Active screen */}
          {screens[activeScreen]}

          {/* FAB + Nav */}
          <Fab onClick={openAdd} />
          <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
        </div>
      </div>

      {/* Toast */}
      <Toast toast={state.toast} />

      {/* Modals */}
      <AddExpenseModal
        open={modal === 'expense'}
        onClose={() => setModal(null)}
        onSubmit={addExpense}
      />
      <AddIncomeModal
        open={modal === 'income'}
        onClose={() => setModal(null)}
        onSubmit={addIncome}
      />
      <AddGoalModal
        open={modal === 'goal'}
        onClose={() => setModal(null)}
        onSubmit={addGoal}
      />
      <SetBudgetModal
        open={modal === 'budget'}
        onClose={() => setModal(null)}
        onSubmit={setBudget}
      />
      <OverspendModal
        pendingDeduct={state.pendingDeduct}
        onClose={() => dispatch({ type: 'CLEAR_PENDING_DEDUCT' })}
        onConfirm={() => {
          confirmDeductSavings();
          dispatch({ type: 'CLEAR_PENDING_DEDUCT' });
        }}
      />
    </>
  );
}
