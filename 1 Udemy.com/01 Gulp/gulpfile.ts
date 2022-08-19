const gulp = require("gulp");

gulp.task("printName", async function () {
  console.log("My name is Michal");
});

gulp.task("printCountry", async function () {
  console.log("I'm from Poland");
});

// gulp.task("default", gulp.parallel(["printName", "printCountry"]));
gulp.task("default", gulp.series(["printName", "printCountry"]));
