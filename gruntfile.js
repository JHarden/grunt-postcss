

module.exports = function(grunt) {


    grunt.initConfig({

        postcss: {

            //options holds info about configuration of postcss
            options:{
                processors:[

                    require('autoprefixer')({browsers: ['last 1 version']}),
                    require('cssnext')(),
                    require('precss')()
                ]
            },

            //dist points to where css files are read from and written to
            dist:{
                src: 'postdest/concat.css',
                dest: 'dest/concat.css'
            }

        },

        concat:{
            css: {
                src: ['src/*.css'],
                dest: 'postdest/concat.css',
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-postcss');

    //create a custom task that uses concat and postcss
    grunt.registerTask('init',['concat','postcss']);


};