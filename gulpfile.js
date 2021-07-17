const gulp = require("gulp");
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const LessAutoPrefix = require("less-plugin-autoprefix");
const chalk = require("chalk");
const newer = require("gulp-newer");
const debug = require("gulp-debug");
const LessPluginCleanCss = require("less-plugin-clean-css"),
    cleanCss = new LessPluginCleanCss({ advanced: true });
const progenyMtime = require("gulp-progeny-mtime");
const autoPrefix = new LessAutoPrefix({ browsers: ["last 2 versions"] });

const log = console.log;

gulp.task("less", () => {
    return gulp
        .src(["static/less/main.less"])
        .pipe(progenyMtime())
        .pipe(
            plumber({
                errorHandler: function (err) {
                    log(chalk.bgRed.white.bold(err.message));
                },
            })
        )
        .pipe(newer({ dest: "static/css/", ext: ".css" }))
        .pipe(debug({ title: "LESS" }))
        .pipe(
            less({
                plugins: [cleanCss, autoPrefix],
            })
        )
        .pipe(gulp.dest("static/css/"));
});

gulp.task("watch-less", () => {
    return gulp.watch("static/less/**/*.less", gulp.series("less"));
});

gulp.task("default", gulp.series("less", "watch-less"));
