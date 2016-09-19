module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // kompilace stylů bootstrapu a samotné šablony webu
        // -> rozděleno do samostatných subtasků kvůli rychlosti
        less: {
            main: {
                files: {
                    'build/style/main.css': 'src/style/theme/main.less',
                }
            }
        },

        // minifikace stylů
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            style: {
                files: {
                    'build/style/main.css': 'build/style/main.css'
                }
            }
        },

        uncss: {
            build: {
                files: {
                    'build/style/main.css': ['build/templates/temp/*.html']
                },
                options: {
                    report: 'gzip',
                    ignore: ['.js-.*', '#.*', '@.*']
                }
            }
        },

        // nahradit adresu k font awesome, jinak vyhazuje 404
        replace: {
            remove_comments: {
                options: {
                    patterns: [{
                        match: RegExp(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm),
                        replacement: ''
                    }],
                    usePrefix: false
                },
                files: [{
                    expand: false,
                    flatten: true,
                    src: 'build/style/main.css',
                    dest: 'build/style/main.css'
                }]
            },
            remove_classes: {
                options: {
                    patterns: [{
                        match: RegExp(/class=".*" s/),
                        replacement: 's'
                    }],
                    usePrefix: false
                },
                files: [{
                    expand: false,
                    flatten: true,
                    src: 'build/templates/page_01.html',
                    dest: 'build/templates/page_01.html'
                }]
            }
        },

        // mazání vygenerovaných souborů před novým generováním
        clean: {
            style: 'build/style/*.css',
            templates: 'build/templates/*'
        },

        // minifikace obrázků a grafiky webu,
        // na png je ještě lepší tinypng.com
        // ale lepší něco než-li ni
        image: {
            image_folder: {
                options: {
                    pngquant: true,
                    optipng: true,
                    zopflipng: true,
                    advpng: true,
                    jpegRecompress: true,
                    jpegoptim: true,
                    mozjpeg: true,
                    gifsicle: true,
                    svgo: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/image/',
                    src: ['*.{png,jpg,gif,svg}'],
                    dest: 'build/image/'
                }]
            },
        },

        // zkompiluje *.kit soubory na kompletní *.html šablony
        codekit: {
            compile_templates: {
                files: [{
                    expand: true,
                    cwd: 'src/templates',
                    src: ['*.kit', '**/*.kit'],
                    dest: 'build/templates/temp/',
                    ext: '.html'
                }]
            }
        },

        inlinecss: {
            build: {
                options: {
                    //removeStyleTags: false
                },
                files: [{
                    expand: true,
                    cwd: 'build/templates/temp',
                    src: '*.html',
                    dest: 'build/templates/',
                }]
            }
        },

        // watch task pro styly, js, šablony i gruntfile
        watch: {
            style_theme: {
                files: ['src/style/theme/*.less', 'src/style/theme/**/*.less'],
                tasks: ['clean:style', 'less', 'cssmin', /* 'uncss',*/ 'replace:remove_comments','clean:templates', 'codekit', 'inlinecss', 'replace:remove_classes']
            },
            template: {
                files: ['src/templates/*.kit', 'src/templates/**/*.kit'],
                tasks: ['clean:templates', 'codekit', 'inlinecss', 'replace:remove_classes']
            },
            image: {
                files: 'src/image/*',
                tasks: ['image']
            },
            grunt: {
                files: ['Gruntfile.js']
            }
        }
    });

    require('jit-grunt')(grunt, {
        inlinecss: 'grunt-inline-css'
    });

    // vývojové prostředí "grunt default"
    grunt.registerTask('default', ['clean', 'image', 'less', 'cssmin', 'codekit', /*'uncss',*/ 'replace:remove_comments', 'inlinecss', 'replace:remove_classes', 'watch']);
};
