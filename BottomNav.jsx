const TABS = [
  { id: 'home', icon: '⌂', label: 'Home' },
  { id: 'income', icon: '↑', label: 'Income' },
  { id: 'expenses', icon: '↓', label: 'Spend' },
  { id: 'budget', icon: '◫', label: 'Budget' },
  { id: 'goals', icon: '◎', label: 'Goals' },
  { id: 'xp', icon: '★', label: 'XP' },
];

export default function BottomNav({ activeScreen, onNavigate }) {
  return (
    <nav style={{
      background: 'var(--color-background-primary)',
      borderTop: '0.5px solid var(--color-border-tertiary)',
      display: 'grid',
      gridTemplateColumns: `repeat(${TABS.length}, 1fr)`,
      flexShrink: 0,
    }}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          style={{
            background: 'none',
            border: 'none',
            padding: '9px 2px 7px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            fontSize: 8,
            color: activeScreen === tab.id ? '#1D9E75' : 'var(--color-text-secondary)',
            lineHeight: 1,
            transition: 'color 0.15s',
          }}
        >
          <span style={{ fontSize: 17, lineHeight: 1 }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
