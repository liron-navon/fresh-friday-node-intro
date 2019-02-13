/**
 * We will not go into this in detail, but the color codes we use are
 * ANSI standards.
 * https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 *
 * Popular logging libraries are:
 * https://github.com/chalk/chalk
 * https://github.com/krakenjs/pine
 */

const resetColor = '\x1b[0m';

const textColors = {
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    white: '\x1b[37m'
};

const backgroundColors = {
    red: '\x1b[41m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    white: '\x1b[47m'
};

const logger = {
    error(...texts) {
        console.error(textColors.red, backgroundColors.yellow, ...texts, resetColor)
    },
    warn(...texts) {
        console.warn(textColors.yellow, ...texts, resetColor)
    },
    log(...texts) {
        console.log(textColors.blue, ...texts, resetColor)
    }
};

logger.error('colored error');
logger.warn('colored warning');
logger.log('colored log');
