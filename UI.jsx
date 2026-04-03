import { useState } from 'react';
import { EXPENSE_CATEGORIES, INCOME_TYPES } from '../utils/constants';

/* ── Toast ── */
export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 90,
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        borderRadius: 8,
        padding: '10px 18px',
        fontSize: 13,
        fontWeight: 500,
        zIndex: 200,
        color: '#EEEDFE',
        background: toast.color || '#7F77DD',
        pointerEvents: 'none',
      }}
    >
      {toast.message}
    </div>
  );
}

/* ── Modal ── */
export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
        zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-background-primary)',
          borderRadius: '20px 20px 0 0',
          padding: 20, width: '100%', maxWidth: 390,
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 14, color: 'var(--color-text-primary)' }}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

/* ── FormGroup ── */
export function FormGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 11 }}>
      <label style={{ fontSize: 13, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '9px 12px', fontSize: 14,
  borderRadius: 8, border: '0.5px solid var(--color-border-secondary)',
  background: 'var(--color-background-secondary)', color: 'var(--color-text-primary)',
};

/* ── BtnRow ── */
export function BtnRow({ onCancel, onConfirm, confirmLabel = 'Confirm', confirmColor = '#1D9E75' }) {
  return (
    <div style={{ display: 'flex', gap: 9, marginTop: 14 }}>
      <button onClick={onCancel} style={{ flex: 1, padding: 11, borderRadius: 8, fontSize: 14, cursor: 'pointer', border: '0.5px solid var(--color-border-secondary)', background: 'none', color: 'var(--color-text-primary)' }}>
        Cancel
      </button>
      <button onClick={onConfirm} style={{ flex: 1, padding: 11, borderRadius: 8, fontSize: 14, cursor: 'pointer', border: 'none', background: confirmColor, color: 'white', fontWeight: 500 }}>
        {confirmLabel}
      </button>
    </div>
  );
}

/* ── XpHero ── */
export function XpHero({ level, rankName, toNext, xp, nextFloor, pct }) {
  return (
    <div style={{ background: 'var(--color-background-primary)', borderRadius: 12, border: '0.5px solid var(--color-border-tertiary)', padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 11 }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#7F77DD', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 9, color: '#EEEDFE', fontWeight: 500, letterSpacing: '0.04em' }}>LVL</span>
          <span style={{ fontSize: 19, fontWeight: 500, color: '#EEEDFE', lineHeight: 1 }}>{level}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>{rankName}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{toNext} XP to next level</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
        <span>{xp} XP</span><span>{nextFloor} XP</span>
      </div>
      <div style={{ height: 8, background: 'var(--color-background-secondary)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 4, background: '#7F77DD', width: `${pct}%`, transition: 'width 0.5s' }} />
      </div>
    </div>
  );
}

/* ── ProgressBar ── */
export function ProgressBar({ pct, color = '#1D9E75' }) {
  return (
    <div style={{ height: 7, background: 'var(--color-background-secondary)', borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ height: '100%', borderRadius: 4, background: color, width: `${pct}%`, transition: 'width 0.4s' }} />
    </div>
  );
}

/* ── Metric ── */
export function Metric({ label, value, color }) {
  return (
    <div style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: 11 }}>
      <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 500, color: color || 'var(--color-text-primary)' }}>{value}</div>
    </div>
  );
}

/* ── Card ── */
export function Card({ label, children }) {
  return (
    <div style={{ background: 'var(--color-background-primary)', borderRadius: 12, border: '0.5px solid var(--color-border-tertiary)', padding: '13px 15px' }}>
      {label && <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 9 }}>{label}</div>}
      {children}
    </div>
  );
}

/* ── Toggle ── */
export function Toggle({ on, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{ width: 36, height: 20, borderRadius: 10, background: on ? '#1D9E75' : 'var(--color-background-secondary)', border: `0.5px solid ${on ? '#1D9E75' : 'var(--color-border-secondary)'}`, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
    >
      <div style={{ position: 'absolute', top: 2, left: on ? 19 : 2, width: 15, height: 15, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
    </div>
  );
}

/* ── EmptyState ── */
export function EmptyState({ message }) {
  return <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{message}</p>;
}

/* ── Add Expense Modal ── */
export function AddExpenseModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = () => {
    if (!name.trim() || !amount || parseFloat(amount) <= 0) return;
    onSubmit({ name: name.trim(), amount: +parseFloat(amount).toFixed(2), category });
    setName(''); setAmount(''); setCategory('Food');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Log expense">
      <FormGroup label="Description">
        <input style={inputStyle} placeholder="e.g. Groceries" value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup label="Amount ($)">
        <input style={inputStyle} type="number" placeholder="0.00" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </FormGroup>
      <FormGroup label="Category">
        <select style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
          {EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </FormGroup>
      <BtnRow onCancel={onClose} onConfirm={handleSubmit} confirmLabel="Add expense" />
    </Modal>
  );
}

/* ── Add Income Modal ── */
export function AddIncomeModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Salary');

  const handleSubmit = () => {
    if (!name.trim() || !amount || parseFloat(amount) <= 0) return;
    onSubmit({ name: name.trim(), amount: +parseFloat(amount).toFixed(2), type });
    setName(''); setAmount(''); setType('Salary');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add income">
      <FormGroup label="Description">
        <input style={inputStyle} placeholder="e.g. Paycheck" value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup label="Amount ($)">
        <input style={inputStyle} type="number" placeholder="0.00" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </FormGroup>
      <FormGroup label="Type">
        <select style={inputStyle} value={type} onChange={(e) => setType(e.target.value)}>
          {INCOME_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </FormGroup>
      <BtnRow onCancel={onClose} onConfirm={handleSubmit} confirmLabel="Add income" />
    </Modal>
  );
}

/* ── Add Goal Modal ── */
export function AddGoalModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [saved, setSaved] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !target || parseFloat(target) <= 0) return;
    onSubmit({ name: name.trim(), target: +parseFloat(target).toFixed(2), saved: +(parseFloat(saved) || 0).toFixed(2) });
    setName(''); setTarget(''); setSaved('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="New savings goal">
      <FormGroup label="What are you saving for?">
        <input style={inputStyle} placeholder="e.g. Emergency fund" value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup label="Target amount ($)">
        <input style={inputStyle} type="number" placeholder="1000" min="1" value={target} onChange={(e) => setTarget(e.target.value)} />
      </FormGroup>
      <FormGroup label="Already saved ($)">
        <input style={inputStyle} type="number" placeholder="0" min="0" value={saved} onChange={(e) => setSaved(e.target.value)} />
      </FormGroup>
      <BtnRow onCancel={onClose} onConfirm={handleSubmit} confirmLabel="Add goal" />
    </Modal>
  );
}

/* ── Set Budget Modal ── */
export function SetBudgetModal({ open, onClose, onSubmit }) {
  const [category, setCategory] = useState('Food');
  const [limit, setLimit] = useState('');

  const handleSubmit = () => {
    if (!limit || parseFloat(limit) <= 0) return;
    onSubmit(category, +parseFloat(limit).toFixed(2));
    setLimit('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Set weekly budget">
      <FormGroup label="Category">
        <select style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
          {EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </FormGroup>
      <FormGroup label="Weekly limit ($)">
        <input style={inputStyle} type="number" placeholder="100" min="1" value={limit} onChange={(e) => setLimit(e.target.value)} />
      </FormGroup>
      <BtnRow onCancel={onClose} onConfirm={handleSubmit} confirmLabel="Set budget" />
    </Modal>
  );
}

/* ── Overspend Modal ── */
export function OverspendModal({ pendingDeduct, onClose, onConfirm }) {
  if (!pendingDeduct) return null;
  return (
    <Modal open={!!pendingDeduct} onClose={onClose} title="Over budget!">
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>
        You're <strong style={{ color: '#D85A30' }}>${pendingDeduct.over.toFixed(2)} over</strong> your weekly <strong>{pendingDeduct.category}</strong> budget.
      </p>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Deduct this from your savings?</p>
      <BtnRow onCancel={onClose} onConfirm={onConfirm} confirmLabel="Deduct from savings" confirmColor="#D85A30" />
    </Modal>
  );
}
