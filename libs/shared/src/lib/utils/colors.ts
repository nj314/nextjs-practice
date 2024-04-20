const COLORS = [
  '#ef4444',
  '#f59e0b',
  '#84cc16',
  '#14b8a6',
  '#0ea5e9',
  '#8b5cf6',
  '#db2777',
];

export function connectionIdToColor(id: number): string {
  return COLORS[id % COLORS.length];
}
