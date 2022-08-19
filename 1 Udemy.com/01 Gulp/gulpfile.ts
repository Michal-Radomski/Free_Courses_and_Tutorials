import gulp from "gulp";
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
// const browserSync = require("browser-sync").create();
// const reload = browserSync.reload;
const cleanCSS = require("gulp-clean-css");

// gulp.task("printName", async function () {
//   console.log("My name is Michal");
// });

// gulp.task("printCountry", async function () {
//   console.log("I'm from Poland");
// });

// gulp.task("default", gulp.parallel(["printName", "printCountry"]));
// gulp.task("default", gulp.series(["printName", "printCountry"]));

// gulp.task("sass", async function () {
//   return gulp
//     .src("./src/sass/**/*.scss")
//     .pipe(sass().on("error", sass.logError))
//     .pipe(sourcemaps.init())
//     .pipe(
//       autoprefixer({
//         cascade: false,
//         // browsers: ["last 2 versions"],
//       })
//     )
//     .pipe(sourcemaps.write("."))
//     .pipe(gulp.dest("./dist/css"));
// });

function scssTask() {
  return gulp
    .src("./src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        cascade: false,
        // browsers: ["last 2 versions"],
      })
    )
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/css"));
}

// File paths
const files = {
  scssPath: "src/sass/**/*.scss",
};

function watchTask() {
  gulp.watch([files.scssPath], gulp.parallel(scssTask));
}

exports.default = gulp.series(gulp.parallel(scssTask), watchTask);
