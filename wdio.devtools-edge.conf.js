// wdio.devtools-edge.config.js

/**
 * This configuration uses the devtools protocol instead of webdriver. 
 * No browser drivers are needed as WebdriverIO communicates directly
 * with the Chromium browser. Devtools protocol is supported by all
 * Chromium based browsers, such as Chromium, Google Chrome, 
 * MicrosoftEdge, Yandex, Brave, Vivaldi, and more. 
 */

 const merge = require('deepmerge');
 const config = {};
 config.default = require('./wdio.conf.js').config;
 
 const video = require('wdio-video-reporter');
 
 // insert modified configuration inside
 config.override = {
     debug: false,
     execArgv: ['--inspect=127.0.0.1:9229'],
     logLevel: 'warn',
     automationProtocol: 'devtools',
     capabilities: [{
 
         // maxInstances can get overwritten per capability. So if you have an in-house Selenium
         // grid with only 5 firefox instances available you can make sure that not more than
         // 5 instances get started at a time.
         maxInstances: 1,
         browserName: 'MicrosoftEdge',
         acceptInsecureCerts: true
         // If outputDir is provided WebdriverIO can capture driver session logs
         // it is possible to configure which logTypes to include/exclude.
         // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
         // excludeDriverLogs: ['bugreport', 'server'],
     }],
     services: [],
     mochaOpts: {
         ui: 'bdd',
         // 20 minutes - larger value helps prevent the browser closing while debugging
         timeout: 1200000
     },
     reporters: [
         [video, {
             saveAllVideos: false,       // If true, also saves videos for successful test cases
             videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
         }],
         ['allure', {
             outputDir: 'allure-results',
             disableWebdriverStepsReporting: true,
             disableWebdriverScreenshotsReporting: false,  // Video will not record if false
         }], 'spec'
     ]
 };
 
 // overwrite any arrays in default with arrays in override.
 const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;
 
 // have main config file as default but overwrite environment specific information
 exports.config = merge(config.default, config.override, { arrayMerge: overwriteMerge, clone: false });