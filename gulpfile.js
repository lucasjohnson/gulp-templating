const gulp = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const deporder = require('gulp-deporder');
const stripdebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require("gulp-postcss");
const postcssNormalize = require('postcss-normalize');
const cssnano = require("cssnano");
const assets = require('postcss-assets');
const mqpacker = require('css-mqpacker');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  })
})

const postCssOptions = [
  assets({ loadPaths: ['images/'] }),
  autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
  mqpacker,
  postcssNormalize({
    browsers: 'last 2 versions',
    forceImport: true
  })
];

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postCssOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('nunjucks', function() {
  return gulp.src('src/pages/**/*.+(html|nunjucks|njk)')
    // .pipe(data(function() {
    //   return require('src/data/data.json')
    // }))
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(gulp.dest('src'))
})

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/pages/**/*.+(html|nunjucks|njk)', gulp.series('nunjucks'))
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch','browserSync'));
