const randomInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + 1;

/* eslint-disable import/prefer-default-export */
export const rollD20 = (modifier = 0) => randomInteger(1, 20) + modifier;
