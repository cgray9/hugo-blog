module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },

            hugo: {
                files: ['layouts/**/*.html', 'sass/**/*.scss'],
                tasks: ['hugo'],
                options: {
                    livereload: true
                }
            }
        },

        sass: {
            options: {
                style: 'compressed'
            },
            dist: {
                files: {
                    'static/css/main.css': 'sass/**/*.scss'
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '127.0.0.1',
                    port: 1313,
                    protocol: 'http',
                    base: 'public',
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('hugo', function () {
        var done = this.async();
        var args = ['--baseUrl=http://127.0.0.1:1313'];
        var hugo = hugo = require('child_process').spawn('hugo', args, {
            stdio: 'inherit'
        });

        ['exit', 'error'].forEach(function(e, index, array) {
            hugo.on(e, function() {
                return done(true);
            });
        })
    })

    grunt.registerTask('default', ['sass', 'connect', 'watch']);
};