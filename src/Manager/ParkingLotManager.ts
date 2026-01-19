import type { Ticket } from "../types/TicketTypes";
import type { PricingStrategy } from "../Pricing/PricingStrategy";
import { HourlyPricingStrategy } from "../Pricing/HourlyPricingStrategy";
import { ParkingManager } from "./ParkingManager";
import { TicketManager } from "./TicketManager";
import { ParkingSpotStorage } from "../Storage/ParkingSpotStorage";
import { TicketStorage } from "../Storage/TicketStorage";
import { VehicleStorage } from "../Storage/VehicleStorage";
import type { Vehicle, VehicleSize, VehicleType } from "../types/VehicleTypes";
import { VehicleAdapter } from "../Adapter/VehicleAdapter";

export class ParkingLotManager {
  private pricingStrategy: PricingStrategy;
  private parkingManager: ParkingManager;
  private ticketManager: TicketManager;
  private parkingSpotStorage: ParkingSpotStorage;
  private vehicleStorage: VehicleStorage;
  private ticketStorage: TicketStorage;
  private static instance: ParkingLotManager;

  private constructor(pricingStrategy?: PricingStrategy) {
    this.pricingStrategy = pricingStrategy ?? new HourlyPricingStrategy();
    this.parkingSpotStorage = new ParkingSpotStorage();
    this.vehicleStorage = new VehicleStorage();
    this.ticketStorage = new TicketStorage();
    this.parkingManager = new ParkingManager(
      this.parkingSpotStorage,
      this.vehicleStorage,
    );
    this.ticketManager = new TicketManager(this.ticketStorage);
  }

  static getInstance(): ParkingLotManager {
    if (!ParkingLotManager.instance) {
      ParkingLotManager.instance = new ParkingLotManager();
    }
    return ParkingLotManager.instance;
  }

  calculateParkingFee(ticket: Ticket): number {
    return this.pricingStrategy.calculateFare(ticket);
  }

  doVehicleEntry(
    id: number,
    licensePlate: string,
    type: VehicleType,
  ): Ticket | null {
    const vehicle: Vehicle | null =
      VehicleAdapter.getVehicleFromTypeAndLicensePlate(type, licensePlate);
    if (vehicle) {
      const parkingSpot = this.parkingManager.parkVehicle(vehicle);
      if (parkingSpot) {
        const ticket = this.ticketManager.issueTicket(
          vehicle,
          parkingSpot,
          new Date(),
        );
        console.log(
          "Vehicle parked successfully for license plate: ",
          licensePlate,
        );
        console.log(" Ticket: ", ticket);
        return ticket;
      } else {
        console.log("Unable to park vehicle for license plate: ", licensePlate);
        return null;
      }
    } else {
      console.log("Unable to create Vehicle for license plate: ", licensePlate);
      return null;
    }
  }

  doVehicleExit(ticket: Ticket): boolean {
    const ticketValidated = this.ticketManager.validateTicket(
      ticket,
      ticket.vehicle.licensePlate,
    );
    if (ticketValidated) {
        const freeParkingSpot = this.parkingManager.unparkVehicle(ticket.vehicle.licensePlate);
        if(freeParkingSpot){
            const exitTime = new Date();
            ticket.exitTime = exitTime;
            this.ticketManager.updateExitTime(ticket.id, new Date());
            const fare = this.calculateParkingFee(ticket);
            console.log("Please pay the following fare", fare);
            return true;
        } else {
            console.log("Unable to unpark vehicle for license plate: ", ticket.vehicle.licensePlate);
            return false;
        }
            
    } else {
        console.log("Unable to validate ticket for license plate: ", ticket.vehicle.licensePlate);
        return false;
    }
  }
}
