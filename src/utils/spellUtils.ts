export function formatLevelText(level: number, useSuffix = false) {
  switch (level) {
    case 0:
      return 'Cantrip';
    case 1:
      return useSuffix ? '1st level' : '1st';
    case 2:
      return useSuffix ? '2nd level' : '2nd';
    case 3:
      return useSuffix ? '3rd level' : '3d';
    default:
      return useSuffix ? `${level}th level` : `${level}th`;
  }
}

export function isConcentration(castTypeId: number): boolean {
  return castTypeId === 1;
}
