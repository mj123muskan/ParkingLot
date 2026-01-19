import { VehicleSize, type Vehicle } from "./VehicleTypes";
import { v4 as uuidv4 } from "uuid";

export enum ParkingSpotType {
  "Compact",
  "Regular",
  "Large",
}

export enum ParkingSpotStatus {
    "Free",
    "Reserved"
}

export abstract class ParkingSpot {
  id: string;
  status: ParkingSpotStatus;
  vehicleParked: Vehicle | null;
  floor: number;
  vehicleSizes: Set<VehicleSize>;
  type: ParkingSpotType;


  constructor(
    status: ParkingSpotStatus,
    vehicleParked: Vehicle | null,
    floor: number,
    vehicleSizes: Set<VehicleSize>,
    type: ParkingSpotType,
  ) {
    this.id = uuidv4();
    this.status = status;
    this.vehicleParked = vehicleParked;
    this.floor = floor;
    this.vehicleSizes = vehicleSizes;
    this.type = type;
  }
}

export class RegularParkingSpot extends ParkingSpot {
  constructor(floor: number) {
    super(
      ParkingSpotStatus.Free,
      null,
      floor,
      new Set([VehicleSize.Small, VehicleSize.Medium]),
      ParkingSpotType.Regular,
    );
  }
}

export class LargeParkingSpot extends ParkingSpot {
  constructor(floor: number) {
    super(
      ParkingSpotStatus.Free,
      null,
      floor,
      new Set([VehicleSize.Small, VehicleSize.Medium, VehicleSize.Large]),
      ParkingSpotType.Large,
    );
  }
}

export class CompactParkingSpot extends ParkingSpot {
  constructor(floor: number) {
    super(
      ParkingSpotStatus.Free,
      null,
      floor,
      new Set([VehicleSize.Small, VehicleSize.Medium]),
      ParkingSpotType.Compact,
    );
  }
}

export type ParkingSpotStorageItem = {
  id: string;
  status: ParkingSpotStatus;
  vehicleParked: Vehicle | null;
  floor: number;
  vehicleSizes: Set<VehicleSize>;
  type: ParkingSpotType;
};
