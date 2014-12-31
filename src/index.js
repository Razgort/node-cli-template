/*globals require, module */

'use strict';

var options;

options = require('./options');

module.exports = {
    // TODO: export your public functions here
    TODO: TODO
};

/**
 * Public function `TODO`.
 *
 * TODO: describe your function here
 *
 * @option TODO       {TODO}    TODO: describe your options here
 * @option silent     {boolean} Disable logging, overrides `syslog` and `log`.
 * @option syslog     {string}  Send logs to syslog, overrides `log`.
 * @option log        {object}  Logging implementation, needs `log.info()`,
 *                              `log.warn()` and `log.error()`.
 * @option config     {string}  Load options from JSON config file.
 */
function TODO (options) {
    options.normalise(options);

    // TODO: implement your function here
}

