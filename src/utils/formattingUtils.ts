export function formatNullableNumStr(inVal?: string | number) {
  if (inVal == null || typeof inVal === 'number') return inVal;

  return !inVal?.length ? null : +inVal;
}
