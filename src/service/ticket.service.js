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
  async getTicketById(code){
    try{
      const ticket = await ticketModel.findOne(code)
      return ticket
    } catch(e){
      throw new Error ("Cant find the ticket")
    }
  }
  async getAllTickets(){
    try{
      const allTickets = await ticketModel.find()
      return allTickets
    }catch(e){
      throw new Error ("There's no tickets")
    }
  }
}
