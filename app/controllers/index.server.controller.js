var data = require('../models/index.server.model.js');

exports.render = function(req, res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }
  
  req.session.lastVisit = 'You last visited on: ' + new Date();
  
  res.render('index', data);  
};