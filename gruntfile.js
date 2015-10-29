

module.exports = function(grunt) {


    grunt.initConfig({

        postcss: {

            //options holds info about configuration of postcss
            options:{
                processors:[

                    //adds vendor prefixes
                    require('autoprefixer')({browsers: ['last 8 version']}),
                    //discard duplicate rules
                    require('postcss-discard-duplicates'),
                    //discard empty rules
                    require('postcss-discard-empty'),
                    //discard comments
                    require('postcss-discard-comments'),
                    //merge longhand properties, margin, padding etc
                    require('postcss-merge-longhand'),
                    //merge adjacent rules
                    require('postcss-merge-rules'),
                    //minifies selector usage
                    require('postcss-minify-selectors'),
                    //minify font declarations
                    require('postcss-minify-font-values'),
                    //sorts properties in a rule from [a-z]
                    require('postcss-property-sorter'),
                    //css beautifier (turn off if using nano)
                    require('perfectionist'),

                    //require('cssnext')(), // not for maintenance projects
                    //require('precss')(),  // not for maintenance projects
                    //require('stylelint')  // not for maintenance projects - good for setting up and maintaining best practices
                    //require('cssnano')({discardComments: {removeAll: true}}) // minifies stylesheet

                ]
            },

            //dist points to where css files are read from and written to
            dist:{
                expand: true,       // Enable dynamic expansion.
                cwd: 'css/',        // Src matches are relative to this path.
                src: '**/*.css',    //enable recursive search
                dest: 'css/',       //set dest file to be same as src file
                ext: '.css',        //set the file extension
                extDot: 'first'     //set naming convention

            }
        },

        concat:{
            css: {
                src: ['css/cards.css','css/checkout.css','css/global.css','css/home.css'],
                //src: ['css/*.css'],
                dest: 'css/consolidated-initial.css',
            }
        },

        process_css:{
            target:{
                src: 'css/*.css',
                dest: 'css/output/'
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-postcss');


    //create a custom task that uses concat and postcss
    grunt.registerTask('init',['concat','postcss']);

    grunt.registerMultiTask('process_css','runs all css files in a folder through various post processors',function(){

        var done = this.async();
        grunt.log.write(':: Set async >> ').ok();


        this.files.forEach(function(fileList){

            grunt.log.write(':: Processing ' + fileList.src.length + ' files >> ').ok();

            //fileList.src is the list of all matching file names

            fileList.src.forEach(function(file){

                grunt.log.write(':: Processing ' + file + ' >> ').ok();
                grunt.log.write(':: dest ' + fileList.dest + file +' >> ').ok();

            });

        });

    });

};