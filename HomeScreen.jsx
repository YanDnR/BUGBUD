import { useMemo } from 'react';
import { Card, EmptyState, Metric, ProgressBar, XpHero } from '../components/UI';
import { CAT_COLORS } from '../utils/constants';
import { fmt, fmts, getLevelInfo, weekSpentByCategory } from '../utils/helpers';

function ExpenseRow({ expense }) {
  const color = CAT_COLORS[expense.category] || '#888780';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{expense.name}</div>
        <div style={{ fontSize: 12, color, marginTop: 2 }}>{expense.category}</div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: '#D85A30' }}>{fmt(expense.amount)}</div>
    </div>
  );
}

function GoalRow({ goal }) {
  const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100));
  const color = pct >= 100 ? '#1D9E75' : pct >= 50 ? '#378ADD' : '#BA7517';
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{goal.name}</span>
        <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{pct}%</span>
      </div>
      <ProgressBar pct={pct} color={color} />
      <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 3 }}>{fmt(goal.saved)} saved of {fmt(goal.target)}</div>
    </div>
  );
}

export default function HomeScreen({ state }) {
  const { expenses, incomes, goals, budgets, totalXP } = state;
  const lvl = useMemo(() => getLevelInfo(totalXP), [totalXP]);
  const ws = useMemo(() => weekSpentByCategory(expenses), [expenses]);

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = +(totalIncome - totalSpent).toFixed(2);
  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);

  const budgetCats = Object.keys(budgets);
  const overCats = budgetCats.filter((c) => (ws[c] || 0) > budgets[c]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 13, display: 'flex', flexDirection: 'column', gap: 11 }}>

      {overCats.length > 0 && (
        <div style={{ background: '#FAECE7', borderRadius: 8, border: '0.5px solid #F0997B', padding: '10px 13px', display: 'flex', gap: 9 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⚠</span>
          <span style={{ fontSize: 13, color: '#712B13', lineHeight: 1.5 }}>
            <strong>Over budget:</strong> {overCats.join(', ')}.
          </span>
        </div>
      )}

      <XpHero level={lvl.level} rankName={lvl.name} toNext={lvl.toNext} xp={totalXP} nextFloor={lvl.nextFloor} pct={lvl.pct} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9 }}>
        <Metric label="Balance" value={fmts(balance)} color={balance >= 0 ? '#378ADD' : '#D85A30'} />
        <Metric label="Savings" value={fmt(totalSaved)} color="#1D9E75" />
        <Metric label="Spent" value={fmt(totalSpent)} color="#D85A30" />
      </div>

      <Card label="Weekly budget">
        {budgetCats.length === 0 ? <EmptyState message="No budgets set yet." /> : (
          budgetCats.slice(0, 3).map((cat) => {
            const s = ws[cat] || 0;
            const lim = budgets[cat];
            const pct = Math.min(100, Math.round((s / lim) * 100));
            const color = pct > 100 ? '#D85A30' : pct > 75 ? '#BA7517' : '#1D9E75';
            return (
              <div key={cat} style={{ marginBottom: 9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{cat}</span>
                  <span style={{ color, fontWeight: 500 }}>{fmt(s)} / {fmt(lim)}</span>
                </div>
                <ProgressBar pct={pct} color={color} />
              </div>
            );
          })
        )}
      </Card>

      <Card label="Goals">
        {goals.length === 0 ? <EmptyState message="No goals yet." /> : goals.slice(0, 2).map((g, i) => <GoalRow key={i} goal={g} />)}
      </Card>

      <Card label="Recent expenses">
        {expenses.length === 0
          ? <EmptyState message="Nothing logged yet." />
          : expenses.slice(0, 3).map((e, i) => <ExpenseRow key={i} expense={e} />)
        }
      </Card>
    </div>
  );
}
