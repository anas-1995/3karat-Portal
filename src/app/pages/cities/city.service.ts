// import { Center } from './../../models/center.model';
import { MainService } from '../../service/main.service';
import { Injectable } from '@angular/core';
import { City } from '../../models/city.model';

@Injectable()
export class CityService {

  constructor(private mainSer: MainService) { }


  getOneObject(id, callback) {
    this.mainSer.APIServ.get("cities/" + id)
      .subscribe((data: any) => {
        callback(null, new City(data))
      }, error => {
        callback(error, null)
      })
  }


  createCity(data, callback) {
    this.mainSer.APIServ.post("cities", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }

  updateCity(data, id, callback) {
    delete data.id
    this.mainSer.APIServ.put("cities/" + id, data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }


  getPaginationObject(limit, offset, callback) {
    let self = this
    var filter = { "limit": limit, "offset": offset }
    if (offset != 0) {

      self.mainSer.APIServ.get("cities?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, City.arrayConstructor(data))
        }, error => {
          callback(error, null)
        })
    }
    else {
      self.getCount(function (error, count) {
        if (error)
          callback(error, null)
        else {
          self.mainSer.APIServ.get("cities?filter=" + JSON.stringify(filter))
            .subscribe((data: any) => {
              callback(null, City.arrayConstructor(data), count)
            }, error => {
              callback(error, null)
            })
        }
      })
    }
  }


  getCount(callback) {
    this.mainSer.APIServ.get("cities/count")
      .subscribe((data: any) => {
        callback(null, data.count)
      }, error => {
        callback(error, null)
      })
  }

  getAllObject(callback) {
    this.mainSer.APIServ.get("cities")
      .subscribe((data: any) => {
        callback(null, City.arrayConstructor(data))
      }, error => {
        callback(error, null)
      })
  }


}
