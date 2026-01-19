import { ParkingSpot, type ParkingSpotStorageItem, ParkingSpotType, CompactParkingSpot, RegularParkingSpot, LargeParkingSpot, ParkingSpotStatus } from "../types/ParkingSpot";

export class ParkingSpotAdapter {

    static convertParkingSpotToStorageItem(parkingSpot: ParkingSpot): ParkingSpotStorageItem {
        return {
            id: parkingSpot.id,
            status: parkingSpot.status,
            vehicleParked: parkingSpot.vehicleParked,
            floor: parkingSpot.floor,
            vehicleSizes: parkingSpot.vehicleSizes,
            type: parkingSpot.type
        }
    }

    static convertStorageItemToParkingSpot(parkingSpotStorageItem: ParkingSpotStorageItem): ParkingSpot{
        switch (parkingSpotStorageItem.type) {
            case ParkingSpotType.Regular:
                const regularSpot = new RegularParkingSpot(parkingSpotStorageItem.floor);
                regularSpot.id = parkingSpotStorageItem.id;
                regularSpot.status = parkingSpotStorageItem.status;
                regularSpot.vehicleParked = parkingSpotStorageItem.vehicleParked;
                regularSpot.vehicleSizes = parkingSpotStorageItem.vehicleSizes;
                return regularSpot;
            case ParkingSpotType.Large:
                const largeSpot = new LargeParkingSpot(parkingSpotStorageItem.floor);
                largeSpot.id = parkingSpotStorageItem.id;
                largeSpot.status = parkingSpotStorageItem.status;
                largeSpot.vehicleParked = parkingSpotStorageItem.vehicleParked;
                largeSpot.vehicleSizes = parkingSpotStorageItem.vehicleSizes;
                return largeSpot;
            case ParkingSpotType.Compact:
            default:
                const compactSpot = new CompactParkingSpot(parkingSpotStorageItem.floor);
                compactSpot.id = parkingSpotStorageItem.id;
                compactSpot.status = parkingSpotStorageItem.status;
                compactSpot.vehicleParked = parkingSpotStorageItem.vehicleParked;
                compactSpot.vehicleSizes = parkingSpotStorageItem.vehicleSizes;
                return compactSpot;
        }
    }

    static convertParkingSpotTypeStringToType(parkingSpotType: string): ParkingSpotType  | null{
        switch (parkingSpotType) { 
            case "Compact":
                return ParkingSpotType.Compact
            case "Regular":
                return ParkingSpotType.Regular
            case "Large":
                return ParkingSpotType.Large
            default:
                return null
        }
    }

}