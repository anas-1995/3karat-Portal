import { appError } from './../../../models/app-error.model';
import { MainService } from './../../../service/main.service';
import { Component, OnInit } from '@angular/core';
import { SubLocationService } from '../sub-location.service';

@Component({
  selector: 'app-list-sub-location',
  templateUrl: './list-sub-location.component.html',
  styleUrls: ['./list-sub-location.component.css']
})
export class ListSubLocationComponent implements OnInit {
  public limit: number = 10
  public offset: number = 0
  public count: number = 0
  arrayLocation: Location[] = []
  // public languageKey = this.mainSer.globalServ.getLanguageKey()

  fields = [
    { "key": "name", "label": "GLOBAL.NAME", "type": "string" },
    { "key": "location.name", "label": "GLOBAL.LOCATION", "type": "object" },
    { "key": "location.city.name", "label": "GLOBAL.CITY", "type": "object" },
    { "key": "status", "label": "GLOBAL.STATUS", "type": "status" },
    {
      "type": "buttons", "label": "", "isIcon": false, "buttons": [
        { "type": "success", "action": "edit", "label": "GLOBAL.EDIT" }
      ]
    }

  ]
  constructor(private subLocationSer: SubLocationService, private mainSer: MainService) { }

  ngOnInit() {
    this.getData()
  }

  addSubLocation() {
    this.mainSer.globalServ.goTo('add-sub-location')
  }

  changePages(page) {
    console.log(page);
    this.offset = (page - 1) * this.limit;
    this.getData()
  }
  getData() {
    var self = this;
    self.subLocationSer.getPaginationObject(self.limit, self.offset, function (err: appError, data, count) {
      if (err)
        return err.returnMessage()
      self.arrayLocation = data;
      if (count)
        self.count = count;
    })
  }

  action(data) {
    if (data.event == 'edit') {
      this.mainSer.globalServ.goTo("edit-sub-location/" + data.id)
    }

  }

}
