import express from 'express';
import { UserModel } from '../DAO/models/users.models.js';

export const usersHtmlRouter = express.Router();
usersHtmlRouter.get('/', async (req, res) => {
  const { page } = req.query;
  console.log(page);
  const users = await UserModel.paginate({}, { limit: /*  limit || */ 10, page: page || 1 });
  let usuarios = users.docs.map((user) => {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  });

  return res.status(200).render('profile', {
    //status:success/error
    //payload: en vez de usuarios como nombre de la propiedad
    user: user,
    //buscar en las diapositivas exactamente cuales hay que enviar
    pagingCounter: users.pagingCounter,
    totalPages: users.totalPages,
    page: users.page,
    hasPrevPage: users.hasPrevPage,
    hasNextPage: users.hasNextPage,
    prevPage: users.prevPage,
    nextPage: users.nextPage /* ,: users., links */,
    /* links: links, */
  });
});