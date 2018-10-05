const gulp = require('gulp');
const bs = require('browser-sync').create();

gulp.task('browser-sync', () => {
  bs.init({
    server: {
      baseDir: './geolocation',
    },
  });
});
