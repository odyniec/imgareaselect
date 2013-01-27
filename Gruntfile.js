module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('imgareaselect.jquery.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> */ '
            },
            dist: {
                src: 'jquery.<%= pkg.name %>.dev.js',
                dest: 'dist/jquery.<%= pkg.name %>-<%= pkg.version %>/scripts/jquery.<%= pkg.name %>.min.js'
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true, cwd: 'distfiles/', src: [ '**' ],
                        dest: 'dist/jquery.<%= pkg.name %>-<%= pkg.version %>/'
                    }
                ]
            }
        },
        qunit: {
            all: [ 'test/*.html' ]
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Default tasks
    grunt.registerTask('default', [ 'uglify', 'copy' ]);
};
