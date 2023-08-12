import * as cartController from "../controllers/carts.controller.js";

export function checkUser(req, res, next) {
  if (req.session.user) {
    return next();
  }
  return res.status(401).render("errorPage", { msg: "please log in" });
}

export function checkAdmin(req, res, next) {
  if (req.session.user.email && req.session.user.admin == true) {
    return next();
  }
  return res
    .status(403)
    .render("errorPage", { msg: "please log in AS ADMIN!" });
}
export const checkCartSession = async (req, res, next) => {
  try {
    if (!req.session.cartId) {
      const userCart = await cartController.createCart();
      req.session.cartId = userCart._id;
    }

    next();
  } catch (error) {
    res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};
