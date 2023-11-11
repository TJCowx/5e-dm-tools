/* eslint-disable import/prefer-default-export */
import { error } from '@tauri-apps/plugin-log';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export async function logMessage(logLevel: LogLevel, message: string) {
  // If it's development mode log to console
  if (process.env.NODE_ENV === 'development') {
    switch (logLevel) {
      case 'error':
        console.error(message);
        break;
      case 'warn':
        console.warn(message);
        break;
      default:
        // eslint-disable-next-line no-console
        console.log(message);
    }
  }

  if (logLevel === 'error') {
    error(message);
  }
}
