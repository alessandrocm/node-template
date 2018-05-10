require('dotenv').config({path: './.env'});
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

const test = {
  run : require('./tasks/test/run')
};

gulp.task('test', test.run);
