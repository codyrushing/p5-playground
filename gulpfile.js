var gulp = require("gulp"),
    buffer = require("vinyl-buffer"),
    source = require("vinyl-source-stream"),
    gulpPlugins = require("gulp-load-plugins")();

var paths = {
  src: {
    app: "./app/"
  },
  dist: {
    js: "./dist/js/"
  }
};

gulp.task("js", function(){
  var browserify = require("browserify");

  var b = browserify({
    entries: paths.src.app + "tesselation.js",
    debug: true
  });

  return b.bundle()
    .pipe(source("tesselation.js"))
    .pipe(buffer())
    .pipe(gulpPlugins.sourcemaps.init({loadMaps: true}))
    .on("error", function(err){
      console.log(err.message);
      this.emit("end");
      this.emit("close");
    })
    .pipe(gulpPlugins.sourcemaps.write())
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task("watch", function(){
  return gulp.watch(paths.src.app + "**/*.js", ["js"]);
})

gulp.task("default", ["js", "watch"]);
