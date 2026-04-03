import { RANKS } from './constants';

export function fmt(n) {
  return '$' + Math.abs(Number(n)).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function fmts(n) {
  return (n < 0 ? '-' : '') + fmt(n);
}

export function getLevelInfo(xp) {
  let level = 1;
  let rankIdx = 0;
  for (let i = 1; i < RANKS.length; i++) {
    if (xp >= RANKS[i].xp) { level = i + 1; rankIdx = i; }
    else break;
  }
  const curFloor = RANKS[rankIdx].xp;
  const nextFloor = RANKS[rankIdx + 1] ? RANKS[rankIdx + 1].xp : curFloor + 1000;
  const pct = Math.min(100, Math.round(((xp - curFloor) / (nextFloor - curFloor)) * 100));
  return { level, name: RANKS[rankIdx].name, pct, toNext: nextFloor - xp, nextFloor };
}

export function weekSpentByCategory(expenses) {
  const result = {};
  expenses.forEach((e) => {
    result[e.category] = +((result[e.category] || 0) + e.amount).toFixed(2);
  });
  return result;
}
