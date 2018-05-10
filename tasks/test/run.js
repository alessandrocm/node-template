const gulp = require('gulp');
const mocha = require('gulp-mocha');

process.env.LOG_LEVEL = 'fatal';
process.env.NODE_ENV = 'test';

module.exports = function run() {
  gulp.src(['./test/**/*.test.js'])
    .pipe(mocha())
  ;
}
