export const getModifier = (value: number) => Math.floor((value - 10) / 2);

export const getFormattedModifier = (value: number) => {
  const modifier = getModifier(value);

  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
};
