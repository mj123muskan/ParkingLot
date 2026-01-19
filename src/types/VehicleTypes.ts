import { v4 as uuidv4 } from "uuid";

export enum VehicleSize {
  "Small",
  "Medium",
  "Large",
}

export enum VehicleType {
  "Car",
  "Motorcycle",
  "Truck",
}

export type VehicleStorageItem = {
  id: string;
  licensePlate: string;
  size: VehicleSize;
  type: VehicleType;
};

export abstract class Vehicle {
  id: string;
  licensePlate: string;
  size: VehicleSize;
  type: VehicleType;

  constructor(
    licensePlate: string,
    size: VehicleSize,
    type: VehicleType,
    id: string,
  ) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.size = size;
    this.type = type;
  }
}

export class Car extends Vehicle {
  constructor(licensePlate: string, id: string = uuidv4()) {
    super(licensePlate, VehicleSize.Medium, VehicleType.Car, id);
  }
}

export class Motorcycle extends Vehicle {
  constructor(licensePlate: string, id: string = uuidv4()) {
    super(licensePlate, VehicleSize.Medium, VehicleType.Motorcycle, id);
  }
}
export class Truck extends Vehicle {
  constructor(licensePlate: string, id: string = uuidv4()) {
    super(licensePlate, VehicleSize.Medium, VehicleType.Truck, id);
  }
}
