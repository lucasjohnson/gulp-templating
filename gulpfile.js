const gulp = require("gulp");
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
const cssnano = require("cssnano");
const assets = require('postcss-assets');
const mqpacker = require('css-mqpacker');
const browserSync = require("browser-sync").create();

const devBuild = (process.env.NODE_ENV !== 'production');

// install css reset

const folder = {
  src: './src/',
  build: './build/'
};

function images() {
  const out = folder.build + 'images/';
  return(
    gulp
      .src(folder.src + 'images/**/*')
      .pipe(newer(out))
      .pipe(imagemin({ optimizationLevel: 5 }))
      .pipe(gulp.dest(out))
  );
}

function js() {

  const jsBuild = gulp.src(folder.src + 'js/**/*')
    .pipe(deporder())
    .pipe(concat('main.js'));

  if (!devBuild) {
    jsBuild = jsBuild
      .pipe(stripdebug)
      .pipe(uglify);
  }
  return jsBuild.pipe(gulp.dest(folder.build + 'js/'));
}

function css() {

  const postCssOptions = [
    assets({ loadPaths: ['images/'] }),
    autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
    mqpacker
  ];

  if (!devBuild) {
    postCssOptions.push(cssnano);
  }

  return (
    gulp
      .src(folder.src + 'scss/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'expanded',
        imagePath: 'images/',
        precision: 3,
        errLogToConsole: true
      }))
      .on('error', sass.logError)
      .pipe(postcss(postCssOptions))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(folder.build + 'css/'))
  )
}


exports.images = images;
exports.js = js;
exports.css = css;
