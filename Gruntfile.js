module.exports = function(grunt) {

	// Load NPM Tasks
	// https://github.com/shootaroo/jit-grunt
	require('jit-grunt')(grunt, {
		'useminPrepare' : 'grunt-usemin'
	});



	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		config: {
			app: './app',
			dist: './dist'
		},

		// == Grunt Dev Dependency Update
		// https://npmjs.org/package/grunt-dev-update
		// http://pgilad.github.io/grunt-dev-update
		devUpdate: {
			main: {
				options: {
					reportUpdated: false, // Report updated dependencies: 'false' | 'true'
					updateType   : "force" // 'force'|'report'|'prompt'
				}
			}
		},

		// sass stylesheet compilation
		sass: {
			options: {
				sourceMap: true,
				includePaths: ["<%= config.app %>/bower_components", "<%= config.app %>/bower_components/foundation/scss"]
			},
			dist: {
				files: {
					'<%= config.dist %>/css/screen.css': '<%= config.app %>/scss/screen.scss'
				}
			}
		},

		// set browser prefixes --> This task is not in use because it's done with the gem version while running sass task (see config.rb from sass)
		autoprefixer: {
			build: {
				options: {
					browsers: ['last 2 versions', '> 1%']
				},
				files: [
					{
						//src file is overwritten with prefixed version
						src : '<%= config.dist %>/css/*.css'
					}
				]
			}
		},

		assemble: {

			options: {
				helpers: ['<%= config.app %>/templates/helperImage.js'],
				flatten: true,
				layout: 'default.hbs',
				layoutdir: '<%= config.app %>/templates/layouts',
				jsDir: './../app/js',
				assets: '<%= config.dist %>',
				bower_components: './../app/bower_components',
				partials: ['<%= config.app %>/templates/partials/{,*/}*.hbs'],
				data: ['<%= config.app %>/templates/data/**/*.json','<%= config.app %>/templates/data/**/*.yml']
			},
			site: {
				options: {
					layout: 'main.hbs'
				},
				src: ['<%= config.app %>/templates/pages/main/**/*.hbs'],
				dest: '<%= config.dist %>'
			},
			php: {
				options: {
					layout: 'backend.hbs',
					ext: '.php'
				},
				src: ['<%= config.app %>/templates/backend/**/*.php'],
				dest: '<%= config.dist %>/backend/'
			}
		},

		// watch Task: watches for file changes and triggers necessary tasks
		watch: {
			scss: {
				files: ['<%= config.app %>/scss/**/*.scss'],
				tasks: 'scss'
			},
			html: {
				files: ['<%= config.app %>/templates/**/*.hbs','<%= config.app %>/templates/**/*.php'],
				tasks: 'html:dev'
			},
			handlebars: {
				files: ['<%= config.app %>/js/templates/**/*.hbs'],
				tasks: 'handlebars'
			},
			data: {
				files: ['<%= config.app %>/js/templates/data/**/*.json','<%= config.app %>/templates/data/**/*.yml'],
				tasks: 'html:dev'
			},
			imagecfg: {
				files: ['<%= config.dist %>/backend/phpThumb.config.php'],
				tasks: 'copy:imageCfg'
			},
			images: {
				files: ['<%= config.app %>/img/**/*.*'],
				tasks: 'copyDist'
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'<%= config.dist %>/*.html',
					'<%= config.dist %>/css/**/*.css',
					'<%= config.app %>/js/**/*.js'
				]
			}
		},
		// dev Server for previewing demo pages
		connect: {
			server: {
				options: {
					port: 9001,
					protocol: 'http',
					hostname: '192.168.178.20',
					base: ['<%= config.dist %>', '.'],  // '.' operates from the root of your Gruntfile, otherwise -> 'Users/user-name/www-directory/website-directory'
					keepalive: false, // set to false to work side by side w/watch task.
					livereload: true,
					open: true
				}
			}
		},
		// delete generated files
		clean: {
			html: ["<%= config.app %>/*.html"],
			css: ["<%= config.dist %>/css/*.css"],
			tmp: '.tmp'
		},

		useminPrepare: {
			options: {
				dest: '<%= config.dist %>',
				root: '<%= config.dist %>'
			},
			html: '<%= config.dist %>/index.html'
		},
		cssmin: {
		},
		usemin: {
			options: {
				assetsDirs: ['<%= config.dist %>']
			},
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/styles/{,*/}*.css']
		},

		handlebars: {
			options: {
				namespace: 'WISP.Templates',
				processName: function(filePath) {
					return filePath.replace(/^templates\//, '').replace(/\.hbs$/, '').replace('./app/js/templates/','');
				}
			},
			all: {
				files: {
					"<%= config.app %>/js/handlebars-templates.js": ["<%= config.app %>/js/templates/**/*.hbs"]
				}
			}
		},
		copy: {
			assets: {
				files: [
					// includes files within path and its sub-directories
					{expand: true,flatten:false, cwd:'<%= config.app %>', src: ['fonts/**'], dest: '<%= config.dist %>/'},
					{expand: true, flatten:false, cwd:'<%= config.app %>', src: ['img/**'], dest: '<%= config.dist %>/'},
					{expand: true, flatten:false, cwd:'<%= config.app %>', src: ['backend/**'], dest: '<%= config.dist %>/'},
					{expand: true, flatten:false, cwd:'<%= config.app %>', src: ['*.*'], dest: '<%= config.dist %>/'},
					{
						src:  '<%= config.app %>/templates/data/events_recommended.json',
						dest: '<%= config.dist %>/data/events_recommended.json'
					}
				]
			},
			imageCfg: {
				src:  '<%= config.dist %>/backend/phpThumb.config.php',
				dest: '<%= config.dist %>/backend/lib/james-heinrich/phpthumb/phpThumb.config.php'
			}
		}
	});

	// update dev dependencies
	grunt.registerTask('update', ['devUpdate']);
	// default task
	grunt.registerTask('default', ['sass', 'autoprefixer', 'html:dev','handlebars','copyDist']);
	// build scss -> css
	grunt.registerTask('scss', ['sass','autoprefixer']);
	// build html
	grunt.registerTask('html', function(target) {
		if (target == null) {
			return grunt.warn('Build target must be specified, production or dev');
		}
		grunt.config('target', target);
		grunt.task.run('assemble');
	});
	// dev Server
	grunt.registerTask('serve', ['default','connect', 'watch']);
	// minification and concat (css, js)
	grunt.registerTask('minify', [
		'useminPrepare',
		'concat:generated',
		'cssmin:generated',
		'uglify:generated',
		'usemin'
	]);
	grunt.registerTask('copyDist', ['newer:copy']);

	grunt.registerTask('build', ['clean','sass', 'autoprefixer', 'html:production','handlebars','copyDist','minify']);


};

