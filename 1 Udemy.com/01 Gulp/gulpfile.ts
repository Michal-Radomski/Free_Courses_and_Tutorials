const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// gulp.task("printName", async function () {
//   console.log("My name is Michal");
// });

// gulp.task("printCountry", async function () {
//   console.log("I'm from Poland");
// });

// gulp.task("default", gulp.parallel(["printName", "printCountry"]));
// gulp.task("default", gulp.series(["printName", "printCountry"]));

gulp.task("sass", async function () {
  return gulp.src("./src/sass/**/*.scss").pipe(sass().on("error", sass.logError)).pipe(gulp.dest("./dist/css"));
});

// exports.buildStyles = buildStyles;
// exports.watch = function () {
//   gulp.watch("./sass/**/*.scss", ["sass"]);
// };
