import log4js from 'log4js';

// eslint-disable-next-line import/prefer-default-export
export function createLogger() {
  log4js.configure({
    appenders: {
      log: {
        type: 'dateFile',
        filename: 'logs/general.log',
        pattern: '.yyyy-MM-dd',
        compress: true,
      },
      console: { type: 'console', level: 'ALL' },
    },
    categories: { default: { appenders: ['log', 'console'], level: 'ALL' } },
  });

  return log4js.getLogger('default');
}
