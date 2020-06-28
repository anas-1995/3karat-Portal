import { appError } from './../../../models/app-error.model';
import { MainService } from './../../../service/main.service';
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.css']
})
export class ListLocationComponent implements OnInit {
  public limit: number = 10
  public offset: number = 0
  public count: number = 0
  arrayLocation: Location[] = []
  // public languageKey = this.mainSer.globalServ.getLanguageKey()

  fields = [
    { "key": "name", "label": "GLOBAL.NAME", "type": "string" },
    { "key": "city.name", "label": "GLOBAL.CITY", "type": "object" },
    { "key": "status", "label": "GLOBAL.STATUS", "type": "status" },
    {
      "type": "buttons", "label": "", "isIcon": false, "buttons": [
        { "type": "success", "action": "edit", "label": "GLOBAL.EDIT" }
      ]
    }

  ]
  constructor(private locationSer: LocationService, private mainSer: MainService) { }

  ngOnInit() {
    this.getData()
  }

  addLocation() {
    this.mainSer.globalServ.goTo('add-location')
  }

  changePages(page) {
    console.log(page);
    this.offset = (page - 1) * this.limit;
    this.getData()
  }
  getData() {
    var self = this;
    self.locationSer.getPaginationObject(self.limit, self.offset, function (err: appError, data, count) {
      if (err)
        return err.returnMessage()
      self.arrayLocation = data;
      if (count)
        self.count = count;
    })
  }

  action(data) {
    if (data.event == 'edit') {
      this.mainSer.globalServ.goTo("edit-location/" + data.id)
    }

  }

}
