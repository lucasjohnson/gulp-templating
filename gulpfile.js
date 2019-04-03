const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const browserSync = require("browser-sync").create();

const input = './src/scss/**/*.scss';
const output = './dist/css';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 1%']
};

function css() {
  return (
    gulp
      .src(input)
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions))
      .on("error", sass.logError)
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(output))
      .pipe(browserSync.stream())
  );
}

function html() {
  return (
    gulp
      .src('./src/index.html')
      .pipe(gulp.dest('./dist'))
  );
}

function reload() {
  browserSync.reload();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch(input, css);
  gulp.watch('./src/**/*.html', html);
  gulp.watch('./dist', reload);
}

exports.css = css;
exports.watch = watch;
