import { City } from "./city.model";

export class Location {
  id: number;
  name: string;
  city: City
  cityId: number
  status: string;
  createdAt: Date;

  constructor(center) {
    this.id = center.id || null;
    this.name = center.name || "";
    this.cityId = center.cityId
    this.city = new City(center.city)
    this.status = center.status || "";
    this.createdAt = center.createdAt || new Date()
  }

  static arrayConstructor(data: any[]): Location[] {
    var centerObject: Location[] = []
    if (data.length > 0)
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        centerObject.push(new Location(element));
        if (index + 1 == data.length)
          return centerObject
      }
    else {
      return centerObject
    }
  }

}

