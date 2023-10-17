import { TicketService } from "../service/ticket.service.js";
import { CartService } from "../service/cart.service.js";
import { loggerDev } from "../utils/logger.js";

const cartService = new CartService();
const ticketService = new TicketService();

export const purchaseCart = async (req, res) => {
  try {
    const userId = req.session.user._id; // Obtén el ID del usuario actual
    const cartId = req.session.user.cart; // Obtén el ID del carrito actual

    const ticket = await cartService.purchase(cartId, userId);

    // Puedes redirigir a una página de confirmación de compra o hacer lo que desees con el ticket aquí

    res.status(200).json({
      status: "success",
      message: "Compra realizada con éxito",
      ticket: ticket,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al finalizar la compra",
      error: error.message,
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
  }catch(e){
    res.status(400).json({error: "Ticket not found in the db"})
  }
};
export const getAllTickets = async (req, res ) => {
    try{
        const allTickets = ticketService.getAllTickets()
        return res.status(200).json({
            status: "success",
            msg: "all tickets",
            data: allTickets
        })
    }catch(e){
        res.status(400).json({error: "Theres no tickets"})
    }
}