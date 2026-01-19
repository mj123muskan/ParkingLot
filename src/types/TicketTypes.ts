import type { ParkingSpot } from "./ParkingSpot";
import type { Vehicle } from "./VehicleTypes";

export type Ticket = {
    id: string;
    entryTime: Date;
    exitTime: Date | null;
    vehicle: Vehicle;
    parkingSpot: ParkingSpot;
    isClosed: boolean;
}

export type TicketStorageItem = {
    id: string;
    entryTime: Date;
    exitTime: Date | null;
    vehicle: Vehicle;
    parkingSpot: ParkingSpot;
    isClosed: boolean;
}