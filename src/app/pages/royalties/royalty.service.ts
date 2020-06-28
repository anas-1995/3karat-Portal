// import { Center } from './../../models/center.model';
import { MainService } from '../../service/main.service';
import { Injectable } from '@angular/core';
import { Royalty } from '../../models/royalty.model';

@Injectable()
export class RoyaltyService {

  constructor(private mainSer: MainService) { }


  getOneObject(id, callback) {
    this.mainSer.APIServ.get("royalties/" + id)
      .subscribe((data: any) => {
        callback(null, new Royalty(data))
      }, error => {
        callback(error, null)
      })
  }


  createCity(data, callback) {
    this.mainSer.APIServ.post("royalties/createNewRoyalty", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }

  updateLocation(data, id, callback) {
    delete data.id
    this.mainSer.APIServ.put("royalties/" + id + "/updateRoyalty", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }


  getPaginationObject(limit, offset, where, callback) {
    let self = this;
    var filter = { "limit": limit, "offset": offset, "where": where }
    if (offset != 0) {
      self.mainSer.APIServ.get("royalties?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, Royalty.arrayConstructor(data))
        }, error => {
          callback(error, null)
        })
    }
    else {
      this.getCount(where, function (error, count) {
        if (error)
          callback(error)
        else {
          self.mainSer.APIServ.get("royalties?filter=" + JSON.stringify(filter))
            .subscribe((data: any) => {
              callback(null, Royalty.arrayConstructor(data), count)
            }, error => {
              callback(error, null)
            })
        }

      })
    }
  }



  getCount(where, callback) {
    this.mainSer.APIServ.get("royalties/count?where=" + JSON.stringify(where))
      .subscribe((count: any) => {
        callback(null, count)
      }, error => {
        callback(error, null)
      })
  }

  // getAllObject(callback) {
  //   this.mainSer.APIServ.get({ "index": "centers", "ordering": "-createdAt" })
  //     .subscribe((data: any) => {
  //       callback(null, Center.arrayConstructor(data))
  //     }, error => {
  //       callback(error, null)
  //     })
  // }


}
