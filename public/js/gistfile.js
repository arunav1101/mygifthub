/*
   * Use this to turn on logging: (in your local extensions file)
   */
  Handlebars.logger.log = function(level) {
    if(level >= Handlebars.logger.level) {
      console.log.apply(console, [].concat(["Handlebars: "], _.toArray(arguments)));
    }
  };
  // DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, 
  Handlebars.registerHelper('log', Handlebars.logger.log);
  // Std level is 3, when set to 0, handlebars will log all compilation results
  Handlebars.logger.level = 3; 

  /* 
   * Log can also be used in templates: '{{log 0 this "myString" accountName}}'
   * Logs all the passed data when logger.level = 0
   */