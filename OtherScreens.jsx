import { useMemo } from 'react';
import { Card, EmptyState, Metric, ProgressBar, Toggle } from '../components/UI';
import { CAT_COLORS, INC_COLORS } from '../utils/constants';
import { fmt, weekSpentByCategory } from '../utils/helpers';

/* ── Income Screen ── */
export function IncomeScreen({ state }) {
  const { incomes } = state;
  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 13, display: 'flex', flexDirection: 'column', gap: 11 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
        <Metric label="Total income" value={fmt(totalIncome)} color="#378ADD" />
        <Metric label="This month" value={fmt(totalIncome)} color="#1D9E75" />
      </div>
      <Card label="Income log">
        {incomes.length === 0 ? <EmptyState message="Tap + to log income." /> : (
          incomes.map((inc, i) => {
            const color = INC_COLORS[inc.type] || '#888780';
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < incomes.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{inc.name}</div>
                  <div style={{ fontSize: 12, color, marginTop: 2 }}>{inc.type}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#1D9E75' }}>+{fmt(inc.amount)}</div>
              </div>
            );
          })
        )}
      </Card>
    </div>
  );
}

/* ── Expenses Screen ── */
export function ExpensesScreen({ state }) {
  const { expenses } = state;
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 13, display: 'flex', flexDirection: 'column', gap: 11 }}>
      <Card label="All expenses">
        {expenses.length === 0 ? <EmptyState message="Nothing logged yet." /> : (
          expenses.map((exp, i) => {
            const color = CAT_COLORS[exp.category] || '#888780';
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < expenses.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{exp.name}</div>
                  <div style={{ fontSize: 12, color, marginTop: 2 }}>{exp.category}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#D85A30' }}>{fmt(exp.amount)}</div>
              </div>
            );
          })
        )}
      </Card>
    </div>
  );
}

/* ── Goals Screen ── */
export function GoalsScreen({ state }) {
  const { goals } = state;
  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 13, display: 'flex', flexDirection: 'column', gap: 11 }}>
      <div style={{ background: 'var(--color-background-secondary)', borderRadius: 12, padding: 15, textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 3 }}>Total saved</div>
        <div style={{ fontSize: 30, fontWeight: 500, color: '#1D9E75' }}>{fmt(totalSaved)}</div>
      </div>
      <Card label="Your goals">
        {goals.length === 0 ? <EmptyState message="Tap + to add a goal." /> : (
          goals.map((g, i) => {
            const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
            const color = pct >= 100 ? '#1D9E75' : pct >= 50 ? '#378ADD' : '#BA7517';
            return (
              <div key={i} style={{ marginBottom: i < goals.length - 1 ? 12 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{g.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{pct}%</span>
                </div>
                <ProgressBar pct={pct} color={color} />
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 3 }}>{fmt(g.saved)} saved of {fmt(g.target)}</div>
              </div>
            );
          })
        )}
      </Card>
    </div>
  );
}

/* ── Budget Screen ── */
export function BudgetScreen({ state, onToggleOverspend }) {
  const { budgets, expenses, overspendDeductOn } = state;
  const ws = useMemo(() => weekSpentByCategory(expenses), [expenses]);
  const budgetCats = Object.keys(budgets);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 13, display: 'flex', flexDirection: 'column', gap: 11 }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Deduct overspend from savings</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Auto-deduct when you go over</div>
          </div>
          <Toggle on={overspendDeductOn} onToggle={onToggleOverspend} />
        </div>
      </Card>

      <Card label="Category limits">
        {budgetCats.length === 0 ? <EmptyState message="Tap + to set a weekly budget." /> : (
          budgetCats.map((cat, i) => {
            const color = CAT_COLORS[cat] || '#888780';
            return (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < budgetCats.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>{cat}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Weekly limit: {fmt(budgets[cat])}</div>
                </div>
              </div>
            );
          })
        )}
      </Card>

      <Card label="This week's progress">
        {budgetCats.length === 0 || expenses.length === 0 ? <EmptyState message="Log expenses to see progress." /> : (
          budgetCats.map((cat, i) => {
            const s = ws[cat] || 0;
            const lim = budgets[cat];
            const pct = Math.min(100, Math.round((s / lim) * 100));
            const barColor = pct > 100 ? '#D85A30' : pct > 75 ? '#BA7517' : '#1D9E75';
            const dotColor = CAT_COLORS[cat] || '#888780';
            return (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < budgetCats.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>{cat}</div>
                  <ProgressBar pct={pct} color={barColor} />
                  <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 3 }}>{fmt(s)} of {fmt(lim)}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 500, color: barColor, flexShrink: 0 }}>{pct}%</div>
              </div>
            );
          })
        )}
      </Card>
    </div>
  );
}
