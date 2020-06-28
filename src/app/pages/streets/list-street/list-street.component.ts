import { appError } from './../../../models/app-error.model';
import { MainService } from './../../../service/main.service';
import { Component, OnInit } from '@angular/core';
import { StreetService } from '../street.service';
import { Street } from '../../../models/street.model';

@Component({
  selector: 'app-list-street',
  templateUrl: './list-street.component.html',
  styleUrls: ['./list-street.component.css']
})
export class ListStreetComponent implements OnInit {
  public limit: number = 1
  public offset: number = 0
  public count: number = 0
  arrayStreet: Street[] = []
  // public languageKey = this.mainSer.globalServ.getLanguageKey()

  fields = [
    { "key": "name", "label": "GLOBAL.NAME", "type": "string" },
    { "key": "subLocation.name", "label": "GLOBAL.SUBLOCATION", "type": "object" },
    { "key": "subLocation.location.name", "label": "GLOBAL.LOCATION", "type": "object" },
    { "key": "subLocation.location.city.name", "label": "GLOBAL.CITY", "type": "object" },
    { "key": "status", "label": "GLOBAL.STATUS", "type": "status" },
    {
      "type": "buttons", "label": "", "isIcon": false, "buttons": [
        { "type": "success", "action": "edit", "label": "GLOBAL.EDIT" }
      ]
    }

  ]


  constructor(private streetSer: StreetService, private mainSer: MainService) { }

  ngOnInit() {
    this.getData()
  }

  addStreet() {
    this.mainSer.globalServ.goTo('add-street')
  }

  changePages(page) {
    this.offset = (page - 1) * this.limit;
    this.getData()
  }
  getData() {
    var self = this;
    self.streetSer.getPaginationObject(self.limit, self.offset, function (err: appError, data, count) {
      if (err)
        return err.returnMessage()
      self.arrayStreet = data;
      if (count)
        self.count = count;
    })
  }

  action(data) {
    if (data.event == 'edit') {
      this.mainSer.globalServ.goTo("edit-street/" + data.id)
    }

  }

}
