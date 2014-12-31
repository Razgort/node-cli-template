/*globals require, module, console, process */

'use strict';

var check, path, fs, defaults, defaultConfig;

check = require('check-types');
path = require('path');
fs = require('fs');

defaults = {
    TODO: 'TODO: add your default option values here',
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
    if (!options.normalised) {
        populateObject(options, readJSON(options.config, defaultConfig));

        options.log = getLog(options);

        populateObject(options, defaults);

        options.normalised = true;
    }
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
        initialiseSyslog(options.syslog);
        return console;
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

function initialiseSyslog (facility) {
    try {
        require('rconsole');

        console.set({
            facility: facility,
            title: 'TODO: set your log title',
            stdout: true,
            stderr: true,
            showLine: false,
            showFile: false,
            showTime: true
        });
    } catch (e) {
        console.log('Failed to initialise syslog, exiting.');
        process.exit(1);
    }
}

