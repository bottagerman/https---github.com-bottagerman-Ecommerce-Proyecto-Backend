import { CartManagerMongo } from "../mongo/cart.mongo.js";

const cartManagerMongo = new CartManagerMongo();

export function checkUser(req, res, next) {
  if (req.session.user) {
    return next();
  }
  return res.status(401).render("errorPage", { msg: "please log in" });
}
export function checkRoll(req, res, next) {
  if (req.session.user.email && req.session.user.admin == true) {
    return next();
  }
  return res
    .status(403)
    .render("errorPage", { msg: "please log in AS ADMIN!" });
}
export function checkPremium(req, res, next) {
  if (req.session.user.email && req.session.user.premium == true) {
    return next();
  }
  return res
    .status(403)
    .render("errorPage", { msg: "please log in AS PREMIUM!" });
}
export const checkCartSession = async (req, res, next) => {
  try {
    if (!req.session.user.cart) {
      return next();
    } else {
      res.redirect(`/views/carts/${req.session.user.cart}`);
    }
  } catch (error) {
    res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};
export const checkCart = async (req, res, next) => {
  try {
    if (!req.session.user.cart) {
      const userCart = await cartManagerMongo.createCart();
      userCart._id = req.session.user.cart;
      return next();
    } else {
      next();
    }
  } catch (error) {
    res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};
export const adminCantBuy = async (req, res, next) => {
  if (req.session.user.email && req.session.user.admin == true) {
    return res
    .status(403)
    .render("errorPage", { msg: "GOTCHA! ADMIN CANT BUY ANYTHING!" });
  } else {
    next();
  }
};
