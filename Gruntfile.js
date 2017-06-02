// var _ = require('lodash');
var fs = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["screenshots", "reports"],
    eslint: {
      options: {
        configFile: '.eslintrc',
      },
      all: ['Gruntfile.js', 'tests/**/*.js', 'pages/**/*.js', 'utils/**/*.js']
    },
    protractor: {
      options: {
        noColor: false, // Do you want the output to use fun colors?
        //debug: true,
      },
      local: {
        configFile: 'conf.local.js',
        keepAlive: true,
        args: {
          seleniumPort: 4444
        }
      },
      ci: {
        configFile: 'conf.ci.js',
        keepAlive: false,
        args: {}
      },
    },
    shell: {
      npm: {
        command: 'npm install'
      },
      wdmu: {
        command: 'webdriver-manager update',
        options: {
          execOptions: {
            cwd: 'node_modules/.bin'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Task to run tests with protractor
  grunt.task.registerTask('ui', function(target) {
    grunt.task.run('clean');
    grunt.task.run('eslint');
    grunt.task.run('config:' + target);
    grunt.task.run('protractor:' + target);
  });

  grunt.task.registerTask('config', function(target) {
    var done = this.async();
    target = target || "local";
    var configFile = 'conf.' + target + '.js';

    if (!fs.existsSync(configFile)) {
      grunt.log.error('Specified configuration file ' + configFile + ' does not exist');
      done(false);
    }
    done(true);
  });
};
