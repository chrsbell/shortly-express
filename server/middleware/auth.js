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

  // console.log(data);
  // req.session = session;//{};
  // req.session.hash = session.hash;
  // req.session.userId = data.insertId;
  // // console.log(session);
  // console.log(` User ID: ${req.session.userId}`);
  // if (session.userId) {
  // let id = data.insertId;
  // return models.Users.get({ id: id })
  //   .then(user => {
  //     if (user) {
  //       console.log(`User is ${user.username} with id of ${user.id}`);
  //       // console.log('user ' + JSON.stringify(user));
  //       req.session.user = { username: user.username };
  //     }
  //     next();
  //     // req.session = session;
  //     // next();
  //   });//).then(next());//.then(() => next());
  //
  // res.end();
  // next();

  // console.log('Cookies: ' + JSON.stringify(res.cookies));
  // console.log('Next!!!!' + next);
  // }

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

