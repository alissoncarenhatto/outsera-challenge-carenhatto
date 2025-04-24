// karma.conf.js
module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        jasmine: {
          // você pode configurar flags do Jasmine aqui, ex: random: false
        },
        clearContext: false // mantém o output do spec no navegador
      },
      jasmineHtmlReporter: {
        suppressAll: true // remove mensagens redundantes
      },
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage/outsera-challenge'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'text-summary' }
        ]
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      // usa ChromeHeadless para CI; para desenvolvimento você pode trocar para 'Chrome'
      browsers: ['ChromeHeadless'],
      singleRun: false,
      restartOnFileChange: true
    });
};
  