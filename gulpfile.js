const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require("gulp-postcss");
const postcssNormalize = require('postcss-normalize');
const assets = require('postcss-assets');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const useref = require('gulp-useref');
const ext_replace = require('gulp-ext-replace');
const clean = require('gulp-clean');
const cache = require('gulp-cache');

gulp.task('browserSync', function() {
  browserSync.init({
    browser: ['google chrome'],
    server: {
      baseDir: 'src/'
    }
  })
})

const postCssOptions = [
  assets({ loadPaths: ['images/'] }),
  autoprefixer(),
  postcssNormalize({
    browsers: 'last 2 versions',
    forceImport: true
  })
];

gulp.task('scss', function() {
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
});

gulp.task('nunjucks', function() {
  return gulp.src('src/pages/**/*.+(html|nunjucks|njk)')
    .pipe(data(function() {
      return require('./src/data/data.json')
    }))
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('useref', function() {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build'))
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
		.pipe(gulp.dest('build/images'))
});

gulp.task('html', function() {
  return gulp.src('src/templates/partials/*.njk')
    .pipe(ext_replace('.html'))
    .pipe(gulp.dest('build/html'))
});

gulp.task('buildFolder', function () {
  return gulp.src('*.*', {read: false})
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('readme',function(){
  return gulp.src('README.md')
  .pipe(gulp.dest('./build'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**')
    .pipe(gulp.dest('build/fonts/'))
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('./src/pages/**/*.+(html|nunjucks|njk)', gulp.series('nunjucks'))
  gulp.watch('./src/templates/**/*.+(html|nunjucks|njk)', gulp.series('nunjucks'))
  gulp.watch('./src/data/**/*.json', gulp.series('nunjucks'))
});

gulp.task('build', gulp.series('buildFolder', 'clean', 'nunjucks', 'scss', 'useref', 'images', 'html', 'readme', 'fonts'));
gulp.task('default', gulp.parallel('nunjucks', 'watch', 'browserSync'));
