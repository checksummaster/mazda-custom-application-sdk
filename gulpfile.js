/**
 * Custom Application SDK for Mazda Connect Infotainment System
 * 
 * A micro framework that allows to write custom applications for the Mazda Connect Infotainment System
 * that includes an easy to use abstraction layer to the JCI system.
 *
 * Written by Andreas Schwarz (http://github.com/flyandi/mazda-custom-applications-sdk)
 * Copyright (c) 2016. All rights reserved.
 * 
 * WARNING: The installation of this application requires modifications to your Mazda Connect system.
 * If you don't feel comfortable performing these changes, please do not attempt to install this. You might
 * be ending up with an unusuable system that requires reset by your Dealer. You were warned!
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the 
 * GNU General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even 
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
 * License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with this program. 
 * If not, see http://www.gnu.org/licenses/
 *
 */

/**
 * This is the build file for the micro framework
 */

var
    gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    del = require('del');

/**
 * ::configuration
 */

var output = "./build/",
    input = "./src/";


/**
 * (build) local apps
 *
 * These tasks handle the copy and build of the local apps
 */

var appsPathInput = "./apps/",
    appsPathOutput = output + 'apps/system/casdk/apps/';


// (cleanup)
gulp.task('apps-cleanup', function () {  
    return del(
        [appsPathOutput + '**/*']
    );
});

// (copy)
gulp.task('apps-copy', function () {  

    return gulp.src(appsPathInput + "**/*", {base: appsPathInput})
        .pipe(gulp.dest(appsPathOutput));
});

// (register)
gulp.task('apps-register', function() {
    return;
});

// (build)
gulp.task('build-apps', function(callback) {
    runSequence(    
        'apps-cleanup',
        'apps-copy',
        'apps-register',
        callback
    );
}); 


/**
 * (build) runtime system
 *
 * These task build the run time system for the micro framework
 */

var runtimePathInput =  input + "runtime/",
    runtimePathOutput = output + 'apps/system/casdk/runtime/';

// (cleanup)
gulp.task('runtime-cleanup', function () {  
    return del(
        [runtimePathOutput + '**/*']
    );
});

// (skeleton)
gulp.task('runtime-skeleton', function() {

    return gulp.src(runtimePathInput + "skeleton/**/*", {base: runtimePathInput + "skeleton"})
        .pipe(gulp.dest(runtimePathOutput));
});

// (surface)
gulp.task('runtime-surface', function() {

    return gulp.src(runtimePathInput + "surface/**/*", {base: runtimePathInput + "surface"})
        .pipe(gulp.dest(runtimePathOutput + "surface/"));
});


// (less)
gulp.task('runtime-less', function () {

    return gulp.src(runtimePathInput + "less/*", {base: runtimePathInput + "less"})
        .pipe(concat('runtime.css'))
        .pipe(less())
        .pipe(gulp.dest(runtimePathOutput));
});


// (Concatenate & Minify)
gulp.task('runtime-js', function () {

    return gulp.src(runtimePathInput + "js/*", {base: runtimePathInput + "js"})
        .pipe(concat('runtime.js'))
        .pipe(gulp.dest(runtimePathOutput));
});

// (build)
gulp.task('build-runtime', function(callback) {
    runSequence(    
        'runtime-cleanup',
        'runtime-skeleton',
        'runtime-surface',
        'runtime-less',
        'runtime-js',
        callback
    );
}); 


/** 
 * Common Commands
 */

// Default Task
gulp.task('default', function (callback) {

    

});