import { Street } from "./street.model";
import { Image } from "./image.model";

export class Royalty {
  id: number;
  street: Street
  subLocationId: number
  locationId: number
  streetId: number
  cityId: number
  status: string;
  buildingName: string
  buildingNumber: number
  area: number
  floor: number
  numberRoom: string
  direction: string
  cover: string
  look: string
  sellingPrice: number
  rentingPrice: number
  hasLift: string
  hasParking: string
  hasTerrace: string
  description: string
  ownerDescription: string
  ownerName: string
  mediatorName: string
  phoneNumber: string
  mobilePhoneNumber: string
  employName: string
  note: string
  typeRoyalty: string
  typeItem: string
  createdAt: Date;
  media: Image[]
  constructor(center) {
    this.id = center.id || null;
    this.cityId = center.cityId
    this.locationId = center.locationId
    this.streetId = center.streetId
    this.street = new Street(center.street)
    this.subLocationId = center.subLocationId
    this.status = center.status || "";
    this.buildingName = center.buildingName || "";
    this.buildingNumber = center.buildingNumber || "";
    this.typeItem = center.typeItem || "";
    this.typeRoyalty = center.typeRoyalty || "";
    this.area = center.area || 0;
    this.floor = center.floor || "";
    this.numberRoom = center.numberRoom || "";
    this.direction = center.direction || "";
    this.cover = center.cover || "";
    this.look = center.look || "";
    this.sellingPrice = center.sellingPrice || 0;
    this.rentingPrice = center.rentingPrice || 0;
    this.hasLift = center.hasLift || "";
    this.hasParking = center.hasParking || "";
    this.hasTerrace = center.hasTerrace || "";
    this.description = center.description || "";
    this.ownerDescription = center.ownerDescription || "";
    this.ownerName = center.ownerName || "";
    this.mediatorName = center.mediatorName || "";
    this.phoneNumber = center.phoneNumber || "";
    this.mobilePhoneNumber = center.mobilePhoneNumber || "";
    this.employName = center.employName || "";
    this.note = center.note || "";
    this.createdAt = center.createdAt || "";
    this.media = Image.arrayconstructor(center.media)

  }

  static arrayConstructor(data: any[]): Royalty[] {
    var centerObject: Royalty[] = []
    if (data.length > 0)
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        centerObject.push(new Royalty(element));
        if (index + 1 == data.length)
          return centerObject
      }
    else {
      return centerObject
    }
  }

}

