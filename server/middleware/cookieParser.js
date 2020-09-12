const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {

    let cookieObj = {};
    let cookies = req.headers.cookie.split('; ');
    for (var i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split('=');
      cookieObj[cookie[0]] = cookie[1];

    }

    // let cookieObj = { cookie[0] : cookie[1]};
    // cookieObj.cookie[0] = cookie[1]
    // console.log(cookieObj);
    req.cookies = cookieObj;
  }
  next();
};

module.exports = parseCookies;