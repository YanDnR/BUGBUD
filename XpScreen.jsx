import { useMemo } from 'react';
import { Card, XpHero } from '../components/UI';
import { ACHIEVEMENTS } from '../utils/constants';
import { getLevelInfo } from '../utils/helpers';

export default function XpScreen({ state }) {
  const { totalXP, expenses, incomes, goals, earnedAchievements } = state;
  const lvl = useMemo(() => getLevelInfo(totalXP), [totalXP]);

  const weekXP = expenses.length * 10;
  const monthXP = expenses.length * 10 + incomes.length * 15 + goals.length * 25;
  const weekPct = Math.min(100, Math.round((expenses.length / 3) * 100));
  const monthPct = Math.min(100, Math.round((expenses.length / 10) * 100));

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 13, display: 'flex', flexDirection: 'column', gap: 11 }}>
      <XpHero level={lvl.level} rankName={lvl.name} toNext={lvl.toNext} xp={totalXP} nextFloor={lvl.nextFloor} pct={lvl.pct} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
        {[
          { label: 'This week', xp: weekXP, sub: `${expenses.length} of 3 logs`, pct: weekPct },
          { label: 'This month', xp: monthXP, sub: `${expenses.length} of 10 logs`, pct: monthPct },
        ].map(({ label, xp, sub, pct }) => (
          <div key={label} style={{ background: 'var(--color-background-secondary)', borderRadius: 8, padding: 11 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#7F77DD' }}>{xp} XP</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 3 }}>{sub}</div>
            <div style={{ height: 6, background: 'var(--color-background-primary)', borderRadius: 3, overflow: 'hidden', marginTop: 7 }}>
              <div style={{ height: '100%', borderRadius: 3, background: '#7F77DD', width: `${pct}%`, transition: 'width 0.4s' }} />
            </div>
          </div>
        ))}
      </div>

      <Card label="How to earn XP">
        {[
          ['Log an expense', '+10 XP'],
          ['Log income', '+15 XP'],
          ['Add a savings goal', '+25 XP'],
          ['Set a weekly budget', '+20 XP'],
          ['Stay under weekly budget', '+40 XP'],
          ['3 expenses in a week', '+50 XP'],
          ['Complete a savings goal', '+200 XP'],
        ].map(([label, xp]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 7 }}>
            <span style={{ color: 'var(--color-text-primary)' }}>{label}</span>
            <span style={{ color: '#7F77DD', fontWeight: 500 }}>{xp}</span>
          </div>
        ))}
      </Card>

      <Card label="Achievements">
        {ACHIEVEMENTS.map((ach) => {
          const earned = earnedAchievements.includes(ach.id);
          return (
            <div key={ach.id} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: earned ? '#E1F5EE' : 'var(--color-background-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, opacity: earned ? 1 : 0.45, flexShrink: 0 }}>
                {ach.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: earned ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>{ach.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 1 }}>{ach.desc}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#7F77DD', flexShrink: 0 }}>{earned ? '+' : ''}{ach.xp} XP</div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
