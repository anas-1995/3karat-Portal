import { appError } from './../../../models/app-error.model';
import { MainService } from './../../../service/main.service';
import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { City } from '../../../models/city.model';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.css']
})
export class ListCityComponent implements OnInit {

  public limit: number = 10
  public offset: number = 0
  public count: number = 0
  arrayCity: City[] = []
  // public languageKey = this.mainSer.globalServ.getLanguageKey()

  fields = [
    { "key": "name", "label": "GLOBAL.NAME", "type": "string" },
    { "key": "status", "label": "GLOBAL.STATUS", "type": "status" },
    {
      "type": "buttons", "label": "", "isIcon": false, "buttons": [
        { "type": "success", "action": "edit", "label": "GLOBAL.EDIT" }
      ]
    }

  ]
  constructor(private citySer: CityService, private mainSer: MainService) { }

  ngOnInit() {
    this.getData()
  }

  addCity() {
    this.mainSer.globalServ.goTo('add-city')
  }

  changePages(page) {
    console.log(page);
    this.offset = (page - 1) * this.limit;
    this.getData()
  }
  getData() {
    var self = this;
    self.citySer.getPaginationObject(self.limit, self.offset, function (err: appError, data, count) {
      if (err)
        return err.returnMessage()
      self.arrayCity = data;
      if (count)
        self.count = count;
    })
  }

  action(data) {
    if (data.event == 'edit') {
      this.mainSer.globalServ.goTo("edit-city/" + data.id)
    }
    else if (data.event == 'show') {
      this.mainSer.globalServ.goTo("show-center/" + data.id)
    }

  }

}
