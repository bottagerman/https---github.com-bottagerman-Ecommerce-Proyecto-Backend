import { ticketModel } from "../DAO/models/ticket.model.js";

export class TicketService {
  async createTicket(ticketData) {
    try {
      const ticket = await ticketModel.create(ticketData);
      return ticket;
    } catch (e) {
      throw new Error("Cant create the ticket");
    }
  }
}
