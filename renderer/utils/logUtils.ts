import log from 'electron-log';
import format from 'date-fns/format';

// eslint-disable-next-line import/prefer-default-export
export const logMessage = (
  type: 'error' | 'warn' | 'info' | 'verbose' | 'debug',
  message: string
) => {
  log.transports.file.fileName = `${format(new Date(), 'yyyy-mm-dd')}.log`;

  switch (type) {
    case 'error':
      log.error(message);
      break;
    case 'warn':
      log.warn(message);
      break;
    case 'info':
      log.info(message);
      break;
    case 'verbose':
      log.verbose(message);
      break;
    case 'debug':
      log.debug(message);
      break;
    default:
      log.log(type, message);
  }
};
