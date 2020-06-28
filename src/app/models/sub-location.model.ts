import { Location } from "./location.model";

export class SubLocation {
  id: number;
  name: string;
  location: Location
  locationId: number
  cityId: number
  status: string;
  createdAt: Date;

  constructor(center) {
    this.id = center.id || null;
    this.name = center.name || "";
    this.cityId = center.cityId
    this.locationId = center.locationId
    this.location = new Location(center.location)
    this.status = center.status || "";
    this.createdAt = center.createdAt || new Date()
  }

  static arrayConstructor(data: any[]): SubLocation[] {
    var centerObject: SubLocation[] = []
    if (data.length > 0)
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        centerObject.push(new SubLocation(element));
        if (index + 1 == data.length)
          return centerObject
      }
    else {
      return centerObject
    }
  }

}

