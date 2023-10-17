import { express } from "express";
import * as TicketController from "../controllers/ticket.controller.js"

export const routerTicket = express.Router()

routerTicket.get("/:tid", TicketController.getTicketById)
routerTicket.get("/", TicketController.getAllTickets)