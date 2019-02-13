(function() {
    'use strict';

    var gulp = require('gulp');
    var del = require('del');
    var path = require('path');
    var async = require('async');
    var inject = require('gulp-inject');
    var ngAnnotate = require('gulp-ng-annotate');
    var concat = require('gulp-concat');
    var rev = require('gulp-rev');
    var sass = require('gulp-sass');
    var csso = require('gulp-csso');
    var ngHtml2Js = require('gulp-ng-html2js');
    var htmlmin = require('gulp-htmlmin');
    var csvToJson = require('gulp-csv2json');

    var homePath = process.cwd();
    var config = require(path.join(homePath, 'config.json'));

    // generic methods
    function generateJsFilesInOrder(postDocs) {
        var files = [];

        var modules = config.imports.modules;
        if (postDocs) {
            files = files.concat(modules.jsForDocs);
        } else {
            for (var i = 0; i < modules.js.length; i++) {
                files.push(path.join(config.build.module, path.basename(modules.js[i])));
            }
        }


        var jsFiles = config.imports.js;
        for (i = 0; i < jsFiles.length; i++) {
            files.push(path.join(config.build.js, path.basename(jsFiles[i])));
        }

        return files;
    }

    function copyFontFiles(done, source, destination) {
        gulp.src(source)
            .pipe(gulp.dest(destination))
            .on('end', done);
    }

    function injectFiles(done, target, root, files) {
        gulp.src(target, {base: root})
            .pipe(inject(gulp.src(files, {read: false}), {relative: true}))
            .pipe(gulp.dest(root))
            .on('end', done);
    }

    // gulp methods
    gulp.task('clean', function() {
        var paths = [
            config.build.root,
            config.dist.root
        ];
        return del(paths, {force: true});
    });

    gulp.task('default', ['clean'], function(done) {
        async.series([
            function prepareBuild(done) {
                async.series([
                    copyIndex,
                    processTemplateFiles,
                    copyJsModuleFiles,
                    copyJsFiles,
                    injectJsFiles,
                    copyCssModuleFiles,
                    generateCssFiles,
                    injectCssFiles,
                    copyFontFilesForBuild,
                    convertCsvToJsonAndCopy
                ], done);
            },
            function prepareDocs(done) {
                async.series([
                    copyBaseFiles,
                    combineAndInjectJsFiles,
                    combineAndInjectCss,
                    copyFontFilesForDocs,
                    copyDataFolder
                ], done);
            }
        ]);
    });

    // build process
    function copyIndex(done) {
        gulp.src(config.src.index)
            .pipe(gulp.dest(config.build.root))
            .on('end', done);
    }

    function processTemplateFiles(done) {
        gulp.src(config.src.html)
            .pipe(htmlmin({collapseWhitespace: false}))
            .pipe(ngHtml2Js({
                moduleName: 'dashboard',
                declareModule: false
            }))
            .pipe(concat('templates.js'))
            .pipe(gulp.dest(config.build.js))
            .on('end', done);
    }

    function copyJsModuleFiles(done) {
        gulp.src(config.imports.modules.js)
            .pipe(gulp.dest(config.build.module))
            .on('end', done);
    }

    function copyJsFiles(done) {
        gulp.src(config.imports.js)
            .pipe(gulp.dest(config.build.js))
            .on('end', done);
    }

    function injectJsFiles(done) {
        var target = config.build.index;
        var root = config.build.root;
        var files = generateJsFilesInOrder();
        injectFiles(done, target, root, files);
    }

    function copyCssModuleFiles(done) {
        gulp.src(config.imports.modules.css)
            .pipe(gulp.dest(config.build.css))
            .on('end', done);
    }

    function generateCssFiles(done) {
        gulp.src(config.src.scss)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(config.build.css))
            .on('end', done);
    }

    function injectCssFiles(done) {
        var target = config.build.index;
        var root = config.build.root;
        var files = config.build.cssFiles;
        injectFiles(done, target, root, files);
    }

    function copyFontFilesForBuild(done) {
        copyFontFiles(done, config.imports.modules.fonts, config.build.fonts);
    }

    function convertCsvToJsonAndCopy(done) {
        gulp.src(config.src.data)
            .pipe(csvToJson({}))
            .pipe(gulp.dest(config.build.dataFolder))
            .on('end', done);
    }

    // dist process
    function copyBaseFiles(done) {
        gulp.src(config.src.index)
            .pipe(gulp.dest(config.dist.root))
            .on('end', done);
    }

    function combineAndInjectJsFiles(done) {
        var files = generateJsFilesInOrder(true);
        gulp.src(files)
            .pipe(ngAnnotate())
            .pipe(concat('system.js'))
            .pipe(rev())
            .pipe(gulp.dest(config.dist.root))
            .on('end', function() {
                injectFiles(done, config.dist.index, config.dist.root, config.dist.jsFiles);
            });
    }

    function combineAndInjectCss(done) {
        gulp.src(config.build.cssFiles)
            .pipe(csso())
            .pipe(concat('system.css'))
            .pipe(rev())
            .pipe(gulp.dest(config.dist.root))
            .on('end', function() {
                injectFiles(done, config.dist.index, config.dist.root, config.dist.cssFiles);
            });
    }

    function copyFontFilesForDocs(done) {
        copyFontFiles(done, config.imports.modules.fonts, config.dist.fonts);
    }

    function copyDataFolder(done) {
        gulp.src(config.build.dataFiles)
            .pipe(gulp.dest(config.dist.data))
            .on('end', done);
    }
})();
