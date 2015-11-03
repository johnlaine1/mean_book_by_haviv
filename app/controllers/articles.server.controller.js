var mongoose = require('mongoose'),
    Article = mongoose.model('Article');
  
/**
 * - The mongoose error object is passes in
 * - Check if the object passed in has an object attached to it called 'errors'
 * - If it does, go through each of the properties on that 'errors' object and
 *    check if that property is indeed an object that has another property
 *    with a name of 'message'
 * - If such a property is found then return it and exit the loop, if no 
 *     object is found with a 'message' property attached, return an error string.
 */
var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        return err.errors[errName].message;
      } else {
      return 'Unknown server error';
      }
    }
  }
};

/**
 * Create the article
 */
exports.create = function(req, res) {
  var article = new Article(req.body);
  article.creator = req.user;
  
  article.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
        
      });
    } else {
      res.json(article);
    }
  });
};
    
/**
 * Fetch all articles
 */
exports.list = function(req, res) {
  Article.find()
         .sort('-created')
         .populate('creator', 'firstName lastName fullName')
         .exec(function(err, articles) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};

/**
 * Middleware to fetch one article.
 * Notice that this function just adds the 'article' object to the request
 *  and then calls the 'next()' function. It does no actually send a response
 *  back to the client.
 */
exports.articleByID = function(req, res, next, id) {
  Article
    .findById(id)
    .populate('creator', 'firstName lastName fullName')
    .exec(function(err, article) {
       if (err) {
         return next(err);
       }
       if (!article) {
         return next(new Error('Failed to load article ' + id));
       }
             
       req.article = article;
       next();
     });
};

/**
 * This function will return the 'article' object that was attached to the
 *   request object by the 'articleByID' function above.
 */
exports.read = function(req, res) {
  res.json(req.article);
};

/**
 * Update an article
 */
exports.update = function(req, res) {
  var article = req.article;
  
  article.title = req.body.title;
  article.content = req.body.content;
  
  article.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

exports.delete = function(req, res) {
  var article = req.article;
  
  article.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Middleware to check whether the logged in user is also the user that created
 *  the article, if so, invoke next(), if not send a 403 response back to the
 *  client.
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.article.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
}