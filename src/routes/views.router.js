import express from 'express';
import { checkAdmin, checkUser } from '../middlewares/auth.js';
export const routerViews = express.Router();

routerViews.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render('errorPage', { msg: 'Cannot close the session' });
    }
    return res.redirect('/login');
  });
});

routerViews.get('/login', (req, res) => {
  res.render('loginForm');
});

routerViews.get('/register', (req, res) => {
  res.render('registerForm');
});

routerViews.get('/profile', checkUser, (req, res) => {
  const user = {firstName: req.session.firstName,
  age: req.session.age}
  res.render('profile', user);
});

routerViews.get('/only-admin', checkAdmin, (req, res) => {
  res.send('ONLY ADMIN CAN SEE THIS MSG');
});