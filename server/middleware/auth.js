const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // console.log('gi');
  // console.log(req.cookies);
  // if (req.cookies) {
  return models.Sessions.create().then((session) => {
    // .then((data) => {
    //   models.Session.get(data)
    //     .then((results) => {
    //       console.log(results);
    //     });
    // console.log(models.Sessions.get(data));
    // console.log(data);
    // console.log(session);
    req.session = { hash: 5 };
    next();
  });
  // res.end();
  // });
  // return req.session;
  // }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

