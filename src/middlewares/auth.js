
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
    if (!req.session.user.cart) {
      // Si no hay carrito en la sesión, avanza a la creación del carrito
      return next();
    } else {
      // Si hay un carrito en la sesión, redirige directamente a la vista del carrito
      return res.redirect(`/views/carts/${req.session.user.cart}`);
    }
  } catch (error) {
    res.status(500).render("errorPage", {
      msg: "Internal server ERROR!",
    });
  }
};
