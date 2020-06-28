// import { Center } from './../../models/center.model';
import { MainService } from '../../service/main.service';
import { Injectable } from '@angular/core';
import { City } from '../../models/city.model';
import { Location } from '../../models/location.model';

@Injectable()
export class LocationService {

  constructor(private mainSer: MainService) { }


  getOneObject(id, callback) {
    this.mainSer.APIServ.get("locations/" + id)
      .subscribe((data: any) => {
        callback(null, new Location(data))
      }, error => {
        callback(error, null)
      })
  }


  createCity(data, callback) {
    this.mainSer.APIServ.post("locations", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }

  updateLocation(data, id, callback) {
    delete data.id
    this.mainSer.APIServ.put("locations/" + id, data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }


  getPaginationObject(limit, offset, callback) {
    let self = this;
    var filter = { "limit": limit, "offset": offset }
    if (offset != 0) {
      self.mainSer.APIServ.get("locations?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, Location.arrayConstructor(data))
        }, error => {
          callback(error, null)
        })
    }
    else {
      self.getCount(function (error, count) {
        if (error)
          callback(error, null)
        else {
          self.mainSer.APIServ.get("locations?filter=" + JSON.stringify(filter))
            .subscribe((data: any) => {
              callback(null, Location.arrayConstructor(data), count)
            }, error => {
              callback(error, null)
            })
        }
      })
    }
  }



  getCount(callback) {
    this.mainSer.APIServ.get("locations/count")
      .subscribe((data: any) => {
        callback(null, data.count)
      }, error => {
        callback(error, null)
      })
  }
  getAllObject(filter = {}, callback) {
    this.mainSer.APIServ.get("locations?filter=" + JSON.stringify(filter))
      .subscribe((data: any) => {
        callback(null, Location.arrayConstructor(data))
      }, error => {
        callback(error, null)
      })
  }


}
