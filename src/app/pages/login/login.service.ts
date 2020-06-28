import { MainService } from './../../service/main.service';
import { Injectable } from '@angular/core';
import { error } from 'util';

@Injectable()
export class LoginService {

  constructor(private mainSer: MainService) {

  }

  login(data, callback) {
    this.mainSer.APIServ.login("users/login?include=user", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }

}
