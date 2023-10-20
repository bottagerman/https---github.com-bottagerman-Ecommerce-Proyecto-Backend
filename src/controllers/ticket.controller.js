import { TicketService } from "../service/ticket.service.js";
import { CartService } from "../service/cart.service.js";
import { loggerDev } from "../utils/logger.js";
import { transport } from "../utils/connections.js";
import dotenv from "dotenv";
dotenv.config();

const cartService = new CartService();
const ticketService = new TicketService();

export const purchaseCart = async (req, res) => {
  try {
    const cid = req.session.user.cart; // ID del carrito actual
    const uid = req.session.user._id; // ID del usuario actual
    const email = req.session.user.email; // EMAIL del usuario

    loggerDev.info(email);

    const ticket = await cartService.purchase(cid, uid);

    const confirm = await transport.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: "Compra realizada con exito!",
      html: `<div>
      <h1>Este mail fue enviado desde GB Signature Guitars</h1>
      <p>Muchas gracias por su compra! este es su ticket: ${ticket}</p>
        </div>`,
    }); //Envia un email para confirmar la compra con informacion del ticket 
    loggerDev.info(confirm);
    return res.status(200).render("purchaseTicket", {
      ticket: {
        _id: ticket._id,
        code: ticket.code,
        date_time: ticket.date_time,
        purchaser: ticket.purchaser,
        amount: ticket.amount,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al finalizar la compra",
      error: loggerDev.error("error al finalizar compra"),
    });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { tid } = req.params;
    const ticket = ticketService.getTicketById(tid);
    loggerDev.info(ticket);
    return res.status(200).json({
      status: "success",
      msg: "Ticket data",
      data: {
        id: ticket._id,
        code: ticket.code,
        date_time: ticket.date_time,
        purchaser: ticket.purchaser,
        products: ticket.products,
        amount: ticket.amount,
      },
    });
  } catch (e) {
    res.status(400).json({ error: "Ticket not found in the db" });
  }
};
export const getAllTickets = async (req, res) => {
  try {
    const allTickets = ticketService.getAllTickets();
    return res.status(200).json({
      status: "success",
      msg: "all tickets",
      data: allTickets,
    });
  } catch (e) {
    res.status(400).json({ error: "Theres no tickets" });
  }
};
