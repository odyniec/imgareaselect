module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('imgareaselect.jquery.json'),
        uglify: {
            min: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> */ '
                },
                files: {
                    'jquery.<%= pkg.name %>.min.js':
                        [ 'jquery.<%= pkg.name %>.js' ]
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true, cwd: 'distfiles/', src: [ '**' ],
                        dest: 'dist/jquery.<%= pkg.name %>-<%= pkg.version %>/'
                    },
                    {
                        src: [ 'jquery.<%= pkg.name %>*.js' ],
                        dest: 'dist/jquery.<%= pkg.name %>-<%= pkg.version %>/scripts/'
                    }                
                ]
            }
        },
        qunit: {
            all: [ 'test/*.html' ]
        },
        compress: {
            dist: {
                options: {
                    archive: 'dist/jquery.<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: 'jquery.<%= pkg.name %>-<%= pkg.version %>/**',
                    dest: ''
                }]
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default tasks
    grunt.registerTask('default', [ 'uglify', 'copy' ]);
};
