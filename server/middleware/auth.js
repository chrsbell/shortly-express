const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // console.log('gi');
  // console.log(req.cookies);
  // if (!req.cookies) {
  Promise.resolve(req.cookies.shortlyid)
    .then((hash) => {
      if (!hash) {
        throw hash;
      } else {
        return models.Sessions.get({ hash });
      }
      console.log('hash ' + hash);
    }).tap((session) => {
      if (!session) {
        throw session;
      }
    })
    .catch(() => {
      return models.Sessions.create()
        .then((data) => {
          return models.Sessions.get({ id: data.insertId });
        })
        .tap(session => {
          console.log('session ' + session);
          res.cookie('shortlyid', session.hash); // = // { shortlyid: { value: session.hash } };
        });
      // });
    }).then((data) => {
      req.session = data;
      next();
    });



};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

