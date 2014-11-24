module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
            all: {
                src: "src/*.js",
                options: {
                    specs: "specs/*.js"
                }
            }
        },

        jshint: {
            all: ["src/*.js", "specs/*.js", "Gruntfile.js"]
        },

        watch: {
            test: {
                tasks: ["test"],
                files: ["src/*.js", "specs/*.js"]
            }
        }
    });

    grunt.registerTask("test", ["jasmine", "jshint"]);

    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
};