/* eslint-disable import/prefer-default-export */
import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export async function logMessage(logLevel: LogLevel, message: string) {
  // Get file name
  const date = new Date();
  const fileName = `${logLevel}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`;

  // If it's development mode log to console
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${logLevel.toUpperCase()}] ${message}`);
  }

  await writeTextFile(fileName, message, { dir: BaseDirectory.AppData });
}
