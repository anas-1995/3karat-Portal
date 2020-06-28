import { AuthService } from './auth.service';
import { AppDirectionService } from './app-direction.service';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable()
export class GlobalService {
  roles = {}
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authSer: AuthService, private translateSer: TranslateService, public directionSer: AppDirectionService) {

    this.roles = {
      "list-abstract-product": {
        "operator": false,
        "admin": true,
      },
      "order-abstract-product": {
        "operator": false,
        "admin": true,
      },
      "operator": false,
      "add-abstract-product": {
        "operator": false,
        "admin": true,
      },
      "edit-abstract-product": {
        "operator": false,
        "admin": true,
      },
      "show-abstract-product": {
        "operator": false,
        "admin": true,
      },

      "add-product": {
        "operator": false,
        "admin": true,
      },
      "edit-product": {
        "operator": false,
        "admin": true,
      },

      "add-center-product": {
        "operator": false,
        "admin": true,
      },
      "edit-center-product": {
        "operator": false,
        "admin": true,
      },

      "list-order": {
        "operator": true,
        "admin": true,
      },

      "list-user": {
        "operator": false,
        "admin": true,
      },
      "list-staf-user": {
        "operator": false,
        "admin": true,
      },
      "add-user": {
        "operator": false,
        "admin": true,
      },

      "list-center": {
        "operator": false,
        "admin": true,
      },
      "add-center": {
        "operator": false,
        "admin": true,
      },
      "show-center": {
        "operator": false,
        "admin": true,
      },
      "edit-center": {
        "operator": false,
        "admin": true,
      },


    }

  }

  isAllowedPage(page) {
    // return true
    var roleUser = this.authSer.getRole();
    if (roleUser != undefined)
      if (this.roles[page][roleUser] == false || this.roles[page][roleUser] == null)
        return false
      else
        return true
  }

  getByStringKey(object, stringKey) {
    return _.at(object, stringKey);

  }

  goTo(newURL: String) {
    this.router.navigate([newURL]);
  }
  reload() {
    location.reload();
  }

  formatDate(date, withTime = true) {
    var tempDate = new Date(date);

    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = tempDate.getDate();
    var monthIndex = tempDate.getMonth();
    var year = tempDate.getFullYear();
    if (withTime)
      return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + tempDate.getHours() + ":" + tempDate.getMinutes();
    else
      return day + ' ' + monthNames[monthIndex] + ' ' + year
  }

  getLanguageKey() {
    var langObj = this.directionSer.getLangAndDir();
    if (langObj.lang == 'en')
      return { "name": "nameEn", "description": "descriptionEn" }
    else
      return { "name": "nameAr", "description": "descriptionAr" }
  }

  translate(key: string[], callback) {
    this.translateSer.get(key).subscribe((value: string[]) => {
      return callback(value)
    })
  }


}
