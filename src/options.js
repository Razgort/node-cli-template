/*globals require, module, console, process */

'use strict';

var check, path, fs, defaults, defaultConfig;

check = require('check-types');
path = require('path');
fs = require('fs');

defaults = {
    TODO: 'TODO: add your default option values here',
    silent: undefined,
    log: { info: nop, warn: nop, error: nop }
};

function nop () {}

// TODO: name your default config file here
defaultConfig = '.TODOrc';

module.exports = {
    cli: [
        {
            format: '-t, --TODO <TODO>',
            description: 'TODO: add your command-line options here, default is `' + defaults.TODO + '`'
        },
        {
            format: '-s, --silent',
            description: 'disable logging'
        },
        {
            format: '-y, --syslog <facility>',
            description: 'send logs to syslog, with the specified facility level'
        },
        {
            format: '-f, --config <path>',
            description: 'read configuration options from a file, default is `' + defaultConfig + '`'
        }
    ],
    normalise: normalise
};

function normalise (options) {
    var normalised;

    if (options.normalised) {
        return options;
    }

    normalised = {
        normalised: true
    };

    populateObject(options, readJSON(options.config, defaultConfig));

    Object.keys(defaults).forEach(function (key) {
        normalised[key] = options[key];
    });

    normalised.log = getLog(normalised);

    populateObject(normalised, defaults);

    return normalised;
}

function readJSON (jsonPath, defaultFileName) {
    check.assert.unemptyString(defaultFileName);

    if (check.not.unemptyString(jsonPath)) {
        jsonPath = defaultFileName;
    }

    jsonPath = path.resolve(jsonPath);

    if (fs.existsSync(jsonPath) && fs.statSync(jsonPath).isFile()) {
        return JSON.parse(fs.readFileSync(jsonPath), { encoding: 'utf8' });
    }

    return {};
}

function populateObject (object, defaultValues) {
    check.assert.object(object);
    check.assert.object(defaultValues);

    Object.keys(defaultValues).forEach(function (key) {
        if (check.not.assigned(object[key])) {
            object[key] = defaultValues[key];
        }
    });
}

function getLog (options) {
    if (options.silent) {
        return undefined;
    }

    if (options.syslog) {
        return getSyslog(options.syslog);
    }

    if (options.log) {
        check.assert.object(options.log);
        check.assert.function(options.log.info);
        check.assert.function(options.log.warn);
        check.assert.function(options.log.error);

        return options.log;
    }

    return require('get-off-my-log').initialise('TODO: set your log origin here', console.log);
}

function getSyslog (facility) {
    try {
        return new (require('ain2'))({
            tag: 'TODO: set your syslog tag',
            facility: facility
        });
    } catch (e) {
        console.log('Failed to initialise syslog, exiting.');
        process.exit(1);
    }
}

