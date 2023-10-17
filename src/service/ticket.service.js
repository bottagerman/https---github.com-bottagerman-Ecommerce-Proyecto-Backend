import { productsModel } from "../DAO/models/products.models.js";
import { ticketModel } from "../DAO/models/ticket.model.js";

export class TicketService {
  async createTicket(ticketData) {
    try {
      const ticket = await ticketModel.create(ticketData);
      return ticket;
    } catch (e) {
      throw new Error("Can't create the ticket");
    }
  }
  async getTicketById(tid) {
    try {
      const ticket = await ticketModel.findOne(tid);
      return ticket;
    } catch (e) {
      throw new Error("Cant find the ticket");
    }
  }
  async getAllTickets() {
    try {
      const allTickets = await ticketModel.find();
      return allTickets;
    } catch (e) {
      throw new Error("There's no tickets");
    }
  }
  async getTicketAndRender(tickets) {
    try {
      const newTicket = [];

      for (const ticket of tickets) {
        const pid = ticket.products.map((product) => product.product);
        const myProducts = await productsModel.findById(pid);

        const products = myProducts.map((product, i) => ({
          title: product.title,
          description: product.description,
          quantity: ticket.products[i].quantity,
        }));

        const newDate = format(new Date(ticket.date_time), "dd/MM/yyyy HH:mm");

        newTicket.push({
          code: ticket.code,
          date_time: newDate,
          amount: ticket.amount,
          products: products,
        });
      }
    } catch (e) {
      throw new Error("Can't render the ticket.");
    }
  }
}
