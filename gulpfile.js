/**
 * Settings
 * Turn on/off build features
 */

var settings = {
    reload: true
};

/**
 * Paths to project folders
 */

var paths = {
    input: 'src/',
    output: 'dist/',
    reload: './dist/'
};

// General
var {gulp, watch, series} = require('gulp');

// BrowserSync
var browserSync = require('browser-sync');

// Watch for changes to the src directory
var startServer = function (done) {

    // Make sure this feature is activated before running
    if (!settings.reload) return done();

    // Initialize BrowserSync
    browserSync.init({
        server: {
            baseDir: paths.reload
        }
    });

    // Signal completion
    done();

};

// Reload the browser when files change
var reloadBrowser = function (done) {
    if (!settings.reload) return done();
    browserSync.reload();
    done();
};

// Watch for changes
var watchSource = function (done) {
    // watch(paths.input, series(exports.default, reloadBrowser));
    watch(paths.input, series(reloadBrowser));
    done();
};

// Watch and reload
// gulp watch
exports.watch = series(
    // exports.default,
    startServer,
    watchSource
);