var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);  

  require('../app/models/user.server.model');
  require('../app/models/article.server.model');

  return db;
};

/*
config:
  an object with properties related to the current environment, such
  as the db connection string. Contents will change depending on 
  current environment.
*/