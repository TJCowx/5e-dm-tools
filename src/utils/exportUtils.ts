// eslint-disable-next-line import/prefer-default-export
export function downloadToJson<T extends object>(jsonObj: T, fileName: string) {
  const jsonString = JSON.stringify(jsonObj, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
