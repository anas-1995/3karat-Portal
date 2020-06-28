import { SubLocation } from "./sub-location.model";

export class Street {
  id: number;
  name: string;
  subLocation: SubLocation
  subLocationId: number
  locationId: number
  cityId: number
  status: string;
  createdAt: Date;

  constructor(center) {
    this.id = center.id || null;
    this.name = center.name || "";
    this.cityId = center.cityId
    this.locationId = center.locationId
    this.subLocation = new SubLocation(center.sublocation)
    this.subLocationId=center.subLocationId
    this.status = center.status || "";
    this.createdAt = center.createdAt || new Date()
  }

  static arrayConstructor(data: any[]): Street[] {
    var centerObject: Street[] = []
    if (data.length > 0)
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        centerObject.push(new Street(element));
        if (index + 1 == data.length)
          return centerObject
      }
    else {
      return centerObject
    }
  }

}

