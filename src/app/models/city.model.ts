export class City {
  id: number;
  name: string;
  status: string;
  createdAt: Date;

  constructor(center) {
    // console.log("SSSSSSSSSS")
    this.id = center.id || null;
    this.name = center.name || "";
    this.status = center.status || "";
    this.createdAt = center.createdAt || new Date()


  }

  static arrayConstructor(data: any[]): City[] {
    var centerObject: City[] = []
    if (data.length > 0)
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        centerObject.push(new City(element));
        if (index + 1 == data.length)
          return centerObject
      }
    else {
      return centerObject
    }
  }

}

