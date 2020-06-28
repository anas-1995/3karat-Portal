// import { Center } from './../../models/center.model';
import { MainService } from '../../service/main.service';
import { Injectable } from '@angular/core';
import { SubLocation } from '../../models/sub-location.model';

@Injectable()
export class SubLocationService {

  constructor(private mainSer: MainService) { }


  getOneObject(id, callback) {
    this.mainSer.APIServ.get("sublocations/" + id)
      .subscribe((data: any) => {
        callback(null, new SubLocation(data))
      }, error => {
        callback(error, null)
      })
  }


  createCity(data, callback) {
    this.mainSer.APIServ.post("sublocations", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }

  updateLocation(data, id, callback) {
    delete data.id
    this.mainSer.APIServ.put("sublocations/" + id, data)
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
      self.mainSer.APIServ.get("sublocations?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, SubLocation.arrayConstructor(data))
        }, error => {
          callback(error, null)
        })
    } else {
      self.getCount(function (error, count) {
        if (error)
          callback(error, null)
        else {
          self.mainSer.APIServ.get("sublocations?filter=" + JSON.stringify(filter))
            .subscribe((data: any) => {
              callback(null, SubLocation.arrayConstructor(data),count)
            }, error => {
              callback(error, null)
            })
        }
      })
    }
  }



  getCount(callback) {
    this.mainSer.APIServ.get("sublocations/count")
      .subscribe((data: any) => {
        callback(null, data.count)
      }, error => {
        callback(error, null)
      })
  }

  getAllObject(filter = {}, callback) {
    this.mainSer.APIServ.get("sublocations?filter=" + JSON.stringify(filter))
      .subscribe((data: any) => {
        callback(null, SubLocation.arrayConstructor(data))
      }, error => {
        callback(error, null)
      })
  }

}
