Parking Lot

The parking lot has multiple parking spots, including compact, regular, and oversized spots.
The parking lot supports parking for motorcycles, cars, and trucks.
Customers can park their vehicles in spots assigned based on vehicle size.
Customers receive a parking ticket with vehicle details and entry time at the entry point and pay a fee based on duration, vehicle size, and time of day at the exit point.

Below are the non-functional requirements:
The system must scale to support large parking lots with many spots and vehicles.
The system must reliably track spot assignments and ticket details to ensure accurate operations.


Entities
ParkingLot {
    id:
    name:
    addressId

}

Parking spot {
    id:
    type: 

}

Vehicle {
    id:
    type: 

}

Parking Ticket {
    id: 
    vehicle id
    vehicle number
    entry time
    exit time
}