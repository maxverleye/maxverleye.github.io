module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					style: 'compressed',
					debugInfo: false,
					lineNumbers: false,
					map: false
				},
				files: [{
			        expand: true,
			        cwd: '../scss/',
			        src: ['main.scss'],
			        dest: '../css/',
			        ext: '.min.css'
			    }]
			}
		},
        autoprefixer: {
            options: {
                 browsers: ["last 2 versions", "ie 8", "ie 9", "iOS 6"],
                 map : false
            },
            css: {
                src: "../css/main.min.css",
                dest: "../css/main.min.css"
            }
        },
		watch: {
			sass: {
				files: '../scss/**',
				tasks: ['sass', 'autoprefixer'],
				options: {
				  interrupt: true
				}
			}
		}
	});
	
	grunt.registerTask('init', ['sass', 'autoprefixer']);
	grunt.registerTask('default', ['init', 'watch']);


};