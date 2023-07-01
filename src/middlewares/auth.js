export function checkUser(req, res, next) {
    if (req.session.email) {
      return next();
    }
    return res.status(401).render('errorPage', { msg: 'please log in' });
  }
  
  export function checkAdmin(req, res, next) {
    if (req.session.email && req.session.admin == true) {
      return next();
    }
    return res.status(403).render('errorPage', { msg: 'please log in AS ADMIN!' });
  }