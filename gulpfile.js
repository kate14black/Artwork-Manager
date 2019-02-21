const gulp = require("gulp");
const sass = require("gulp-sass");
const { exec } = require("child_process");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");

const folders = {
  sass: "src/styles/**/",
  dest: "static/"
};
const sassExt = ".scss";

const sassOptions = {
  errLogToConsole: true,
  outputStyle:     "compressed"
};

const autoprefixerOptions = {
  browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
};

gulp.task("styles", () => {
  gulp
    .src(`${folders.sass}main${sassExt}`)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(`${folders.dest}`));
});

gulp.task("server", (cb) => {
  exec("node build/dev-server.js", (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
});

gulp.task("watch", () => {
  gulp.watch(`${folders.sass}**/*${sassExt}`, ["styles"]);
});

gulp.task("default", ["server", "styles", "watch"]);
