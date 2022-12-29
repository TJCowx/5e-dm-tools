/* eslint-disable import/prefer-default-export */

export const stopPropagation =
  (callback: () => void) => (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    callback();
  };
