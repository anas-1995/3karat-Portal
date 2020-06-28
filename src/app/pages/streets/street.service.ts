// import { Center } from './../../models/center.model';
import { MainService } from '../../service/main.service';
import { Injectable } from '@angular/core';
import { SubLocation } from '../../models/sub-location.model';
import { Street } from '../../models/street.model';

@Injectable()
export class StreetService {

  constructor(private mainSer: MainService) { }


  getOneObject(id, callback) {
    this.mainSer.APIServ.get("streets/" + id)
      .subscribe((data: any) => {
        callback(null, new Street(data))
      }, error => {
        callback(error, null)
      })
  }


  createCity(data, callback) {
    this.mainSer.APIServ.post("streets", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }

  updateLocation(data, id, callback) {
    delete data.id
    this.mainSer.APIServ.put("streets/" + id, data)
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
      self.mainSer.APIServ.get("streets?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, Street.arrayConstructor(data))
        }, error => {
          callback(error, null)
        })
    } else {
      self.getCount(function (error, count) {
        if (error)
          callback(error, null)
        else {
          self.mainSer.APIServ.get("streets?filter=" + JSON.stringify(filter))
            .subscribe((data: any) => {
              callback(null, Street.arrayConstructor(data), count)
            }, error => {
              callback(error, null)
            })
        }

      })
    }
  }


  getCount(callback) {
    this.mainSer.APIServ.get("streets/count")
      .subscribe((data: any) => {
        callback(null, data.count)
      }, error => {
        callback(error, null)
      })
  }

  getAllObject(filter = {}, callback) {
    this.mainSer.APIServ.get("streets?filter=" + JSON.stringify(filter))
      .subscribe((data: any) => {
        callback(null, Street.arrayConstructor(data))
      }, error => {
        callback(error, null)
      })
  }


}
