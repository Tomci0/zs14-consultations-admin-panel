const livereload = require('connect-livereload');
const webpackConfig = require('./webpack.config');



module.exports = function (grunt) {
    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),

        ts: {
            default: {
                tsconfig: './tsconfig.json'
            }
        },

        /*
        *
        *   DEFAULT OPTIONS
        *
        */

        // watch

        watch: {
            options: {
                livereload: true, // enable liveserver
            },
        },




        /*
        *
        *   CONNECT
        *   Description: Create webserver for livereload
        * 
        */

        connect: {
            dev: {
                options: {
                    port: 8000,
                    base: 'dist',
                    protocol: 'http',
                    hostname: 'localhost',
                    livereload: 35729,

                    open: {
                        appName: 'open',
                    }
                },
            }
        },

        /*
        *
        *   COPY
        *   Description: Copies images from src to dist
        *   To-Do: Minify images
        * 
        */

        copy: {
            default: {
                expand: true,
                cwd: 'src/images',
                src: '**',
                dest: 'dist/images',
            },
            dev: {
                expand: true,
                cwd: 'tmp/css',
                src: '**/*.css',
                dest: 'dist/css'
            }
        },

        /*
        *
        *   CLEAN
        *   Description: Clear all temp files
        * 
        */


        clean: {
            build: {
                src: ['tmp']
            }
        },


        /*
        *
        *   HTML - ACTIONS
        *   Description: Minfy html.
        * 
        */

        // INCLUDE FILES TO HTML

        includereplace: {
            dev: {
                options: {
                    prefix: '<!-- @@',
                    suffix: ' -->',
                    includesDir: 'src/pages/components/'
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: 'pages/*.html',
                    dest: 'tmp'
                }]
            }
        },

        // MINFY HTML

        htmlmin: {                                     
            build: {
                options: {                                 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'tmp/pages',
                    src: '**/*.html',
                    dest: 'dist'
                }]
            },
            dev: {                                       
                files: [{
                    expand: true,
                    cwd: 'tmp/pages',
                    src: '**/*.html',
                    dest: 'dist'
                }]
            }
        },


        /*
        *
        *   SASS
        *   Description: Complie sass to css and minfy
        * 
        */

        // COMPLITE SASS TO CSS

        sass: {
            dist: {
                options: {
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['**/**/*.scss'],
                    dest: 'tmp/css',
                    ext: '.css'
                }]
            }
        },

        // PROCCESSING CSS

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')()
                ]
            },
            dist: {
                src: 'tmp/css/main.css'
            }
        },

        // MINFY CSS

        cssmin: { 
            build: {
                files: [{
                    expand: true,
                    cwd: 'tmp/css',
                    src: ['*.css', '!*.min.css', 'pages/**/*.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        /*
        *
        *   TYPESCRIPT
        *   Description: Build Typescript
        * 
        */

        typescript: {
            base: {
                src: ['src/tsc/**/*.ts'],
                dest: 'tmp/tsc',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    rootDir: 'src/tsc',
                    sourceMap: false,
                    declaration: true
                }
            }
        },


        /*
        *
        *   JAVASCRIPT
        *   Description: Minfy and create bundle of js.
        * 
        */

        // Minfy and bundle js.

        uglify: {
            pages: {
                files: [{
                    expand: true,
                    cwd: 'src/js/pages/',
                    src: '**/*.js',
                    dest: 'dist/js/pages/',
                    ext: '.min.js',
                    rename: function (dest, src) {
                        const folder = src.split('/')[0];
                        return `${dest}${folder}.min.js`;
                    },
                }]
            },
            main: {
                files: {
                    'dist/js/main.min.js': [
                        'src/js/main.js',
                        'src/js/components/*.js'
                    ]
                }
            },
            libs: {
                files: [{
                    expand: true,
                    cwd: 'src/js/libs/',
                    src: '*.js',
                    dest: 'dist/js/',
                    ext: '.min.js',
                }]
            },
        },
    });


    /*
    *
    *   WATCH
    * 
    */

    // HTML

    grunt.config.merge({
        watch: {
            html: {
                files: [
                    'src/pages/**/*.html',
                ],
                tasks: ['includereplace', 'htmlmin']
            },
        },
    });

    // TYPESCRIPT

    // JAVASCRIPT

    grunt.config.merge({
        watch: {
            scripts: {
                files: [
                    'src/js/**/**/*.js',
                ],
                tasks: ['uglify']
            },
        }
    });

    // SCSS

    grunt.config.merge({
        watch: {
            scss: {
                files: [
                    'src/scss/**/*.scss',
                ],
                tasks: ['sass', 'postcss', 'cssmin', 'copy'],
                options: {
                    nospawn: false,
                    spawn: false
                }
            },
        }
    });

    /*
    *
    *   TYPESCRIPT
    *   TO-DO: REWRITE JS TO TYPESCRIPT
    * 
    */

    // grunt.config.merge({
    //     webpack: {
    //         options: {
    //             stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    //         },
    //         prod: webpackConfig,
    //         dev: Object.assign({ watch: true }, webpackConfig),
    //     },
    // });

    


    /*
    *
    *   LOAD GRUNT PLUGINS
    * 
    */

    grunt.loadNpmTasks('grunt-contrib-watch');

    // SASS

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // JS

    grunt.loadNpmTasks('grunt-contrib-uglify');

    // HTML

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-include-replace');

    // WEBSERVER

    grunt.loadNpmTasks('grunt-contrib-connect');

    // OTHER DEV LOGIC

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ts');

    // grunt.loadNpmTasks('grunt-webpack');

    
    /*
    *
    *   REGISTER TASKS 
    * 
    */


    // DEV
    // INCL. WEBSERVER & LIVERELOAD

    grunt.registerTask('dev', ['build:dev', 'connect:dev', 'watch']);

    // BUILD FILES to DIST

    grunt.registerTask('build', ['uglify', 'sass', 'postcss', 'cssmin', 'copy', 'includereplace', 'htmlmin:build', 'clean:build']);
};