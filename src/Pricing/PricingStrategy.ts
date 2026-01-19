import type { Ticket } from "../types/TicketTypes";

export interface PricingStrategy {
  calculateFare(ticket: Ticket): number;
}
