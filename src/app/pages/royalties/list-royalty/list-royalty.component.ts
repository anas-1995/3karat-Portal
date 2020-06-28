import { appError } from './../../../models/app-error.model';
import { MainService } from './../../../service/main.service';
import { Component, OnInit } from '@angular/core';
import { Street } from '../../../models/street.model';
import { RoyaltyService } from '../royalty.service';
import { DialogService } from '../../../service/dialog.service';
import { CityService } from '../../cities/city.service';
import { City } from '../../../models/city.model';
import { LocationService } from '../../locations/location.service';
import { SubLocationService } from '../../sub-locations/sub-location.service';
import { SubLocation } from '../../../models/sub-location.model';
import { StreetService } from '../../streets/street.service';

@Component({
  selector: 'app-list-royalty',
  templateUrl: './list-royalty.component.html',
  styleUrls: ['./list-royalty.component.css']
})
export class ListRoyaltyComponent implements OnInit {
  public limit: number = 10
  public offset: number = 0
  public count: number = 0
  arrayRoyalty: Street[] = []
  // public languageKey = this.mainSer.globalServ.getLanguageKey()

  fields = [
    { "key": "ownerName", "label": "GLOBAL.OWNERNAME", "type": "string" },
    { "key": "area", "label": "GLOBAL.AREA", "type": "price" },
    { "key": "createdAt", "label": "GLOBAL.CREATED_AT", "type": "date" },
    { "key": "status", "label": "GLOBAL.STATUS", "type": "status" },
    {
      "type": "buttons", "label": "", "isIcon": false, "buttons": [
        { "type": "success", "action": "edit", "label": "GLOBAL.EDIT" },
        { "type": "warning", "action": "show", "label": "GLOBAL.SHOW" }
      ]
    }

  ]

  show = false

  directions = [
    { "value": "east", "title": "east" },
    { "value": "west", "title": "west" },
    { "value": "north", "title": "north" },
    { "value": "south", "title": "south" },
    { "value": "eastWest", "title": "eastWest" },
    { "value": "eastNorth", "title": "eastNorth" },
    { "value": "eastSouth", "title": "eastSouth" },
    { "value": "westNorth", "title": "westNorth" },
    { "value": "westSouth", "title": "westSouth" },
    { "value": "northSouth", "title": "northSouth" },
    { "value": "eastWestNorth", "title": "eastWestNorth" },
    { "value": "eastWestSouth", "title": "eastWestSouth" },
    { "value": "eastNorthSouth", "title": "eastNorthSouth" },
    { "value": "westNorthSouth", "title": "westNorthSouth" },
    { "value": "eastWestNorthSouth", "title": "eastWestNorthSouth" }
  ]
  hasLift = [{ "value": "yesInner", "title": "yesInner" }, { "value": "yesOuter", "title": "yesOuter" }, { "value": "no", "title": "no" }]
  hasParking = [{ "value": "yesNotFree", "title": "yesNotFree" }, { "value": "yesFree", "title": "yesFree" }, { "value": "no", "title": "no" }]
  hasTerrace = [{ "value": "yes", "title": "yes" }, { "value": "no", "title": "no" }]

  descriptions = [
    { "value": "commercial", "title": "commercial" },
    { "value": "residential", "title": "residential" },
    { "value": "parking ", "title": "parking" },
    { "value": "warehouse", "title": "warehouse" }]

  covers = [
    { "value": "bad", "title": "bad" },
    { "value": "normal", "title": "normal" },
    { "value": "good", "title": "good" },
    { "value": "delox", "title": "delox" },
    { "value": "superDelox", "title": "superDelox" }
  ]

  typesRoyalty = [
    { "value": "greenTaboo", "title": "greenTaboo" },
    { "value": "notary", "title": "notary" },
    { "value": "agricultural", "title": "agricultural" },
    { "value": "temporaryTaboo", "title": "temporaryTaboo" },
    { "value": "courtRuling", "title": "courtRuling" },
    { "value": "violations", "title": "violations" }
  ]


  status = [{ "value": "active", "title": "active" }, { "value": "unavailable", "title": "unavailable" }]
  types = [
    { "value": "selling", "title": "selling" },
    { "value": "renting", "title": "renting" },
    { "value": "investment", "title": "investment" },
    { "value": "sellingRenting", "title": "sellingRenting" },
    { "value": "sellingInvestment", "title": "sellingInvestment" },
    { "value": "rentingInvestment", "title": "rentingInvestment" },
    { "value": "sellingRentingInvestment", "title": "sellingRentingInvestment" }
  ]

  ownerDescriptions = [
    { "value": "frog", "title": "frog" },
    { "value": "property", "title": "property" },
    { "value": "frogProperty", "title": "frogProperty" }
  ]


  constructor(private royaltySer: RoyaltyService, private dialogSer: DialogService, private mainSer: MainService, private streetSer: StreetService, private subLocationsSer: SubLocationService, private locationsSer: LocationService, private citySer: CityService) { }
  cities: City[]
  locations: Location[]
  subLocations: SubLocation[]
  streets: Street[]
  ngOnInit() {
    this.filterData()
    let self = this
    self.citySer.getAllObject(function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.cities = data;
    })

    self.locationsSer.getAllObject({}, function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.locations = data;
    })

    self.subLocationsSer.getAllObject({}, function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.subLocations = data;
    })
    self.streetSer.getAllObject({}, function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.streets = data;
    })
  }

  addStreet() {
    this.mainSer.globalServ.goTo('add-royalty')
  }

  changePages(page) {
    this.offset = (page - 1) * this.limit;
    this.filterData()
  }
  getData(where = {}) {
    var self = this;
    self.royaltySer.getPaginationObject(self.limit, self.offset, where, function (err: appError, data, count) {
      if (err)
        return err.returnMessage()
      self.arrayRoyalty = data;
      if (count)
        self.count = count;
    })
  }
  animationState = "out"
  taggleSearch() {
    let element = document.getElementById("search")
    console.log(this.animationState);
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    console.log(this.animationState);
    console.log(element)
  }
  action(data) {
    let self = this
    if (data.event == 'edit') {
      this.mainSer.globalServ.goTo("edit-royalty/" + data.id)
    }
    else if (data.event == 'show') {
      this.dialogSer.viewItem(this.arrayRoyalty[data.index], function () {
        self.mainSer.globalServ.goTo("edit-royalty/" + data.id)
      })
    }


  }


  filterData(isNewFilter = false) {
    if (isNewFilter) {
      this.offset = 0
    }
    let and = []
    for (var key in this.filter) {
      if (this.filter[key] != "")
        if (key == "buildingName") {
          and.push({ "buildingName": this.getRegex(this.filter['buildingName']) })
        }
        else if (key == "buildingNumber") {
          and.push({ "buildingNumber": this.getRegex(this.filter['buildingNumber']) })
        }
        else if (key == "numberRoom") {
          and.push({ "numberRoom": this.getRegex(this.filter['numberRoom']) })
        }
        else if (key == "ownerName") {
          and.push({ "ownerName": this.getRegex(this.filter['ownerName']) })
        }
        else if (key == "mediatorName") {
          and.push({ "mediatorName": this.getRegex(this.filter['mediatorName']) })
        }
        else if (key == "employName") {
          and.push({ "employName": this.getRegex(this.filter['employName']) })
        }
        else if (key == "floor") {
          and.push({ "floor": this.getRegex(this.filter['floor']) })
        }
        else if (key == "look") {
          and.push({ "look": this.getRegex(this.filter['look']) })
        }
        else if (key == "phoneNumber") {
          and.push({ "phoneNumber": this.getRegex(this.filter['phoneNumber']) }, { "mobilePhoneNumber": this.getRegex(this.filter['phoneNumber']) })
        }
        else if (key == "minArea") {
          and.push({ "area": { "gte": this.filter.minArea } })
        }
        else if (key == "maxArea") {
          and.push({ "area": { "lte": this.filter.maxArea } })
        }
        else if (key == "ownerId" || key == "hasTerrace" || key == "hasParking" || key == "ownerDescription" || key == "description" || key == "typeItem" || key == "status" || key == "cityId" || key == "locationId" || key == "subLocationId" || key == "streetId" || key == "direction" || key == "cover" || key == "typeRoyalty" || key == "hasLift") {
          let object = {}
          object[key] = this.filter[key]
          and.push(object)
        }
    }
    if (this.filter.typeItem == "selling" || this.filter.typeItem == "") {
      and.push({ "sellingPrice": { "lte": this.filter.sellingMaxPrice } })
      and.push({ "sellingPrice": { "gte": this.filter.sellingMinPrice } })
    }
    if (this.filter.typeItem == "renting" || this.filter.typeItem == "") {
      and.push({ "rentingPrice": { "lte": this.filter.rentingMaxPrice } })
      and.push({ "rentingPrice": { "gte": this.filter.rentingMinPrice } })
    }
    console.log(and)

    this.getData({ "and": and })
  }

  getRegex(string) {
    var pattern = new RegExp('.*' + string + '.*', "i"); /* case-insensitive RegExp search */
    return { regexp: pattern.toString() }
  }

  filter = {
    "ownerId": this.mainSer.authServ.getUserId(),
    "typeItem": "",
    "status": "",
    "cityId": "",
    "locationId": "",
    "subLocationId": "",
    "streetId": "",
    "buildingName": "",
    "buildingNumber": "",
    "minArea": 0,
    "maxArea": 1000,
    "floor": "",
    "numberRoom": "",
    "direction": "",
    "look": "",
    "description": "",
    "ownerDescription": "",
    "cover": "",
    "typeRoyalty": "",
    "sellingMinPrice": 0,
    "sellingMaxPrice": 99999999999999,
    "rentingMinPrice": 0,
    "rentingMaxPrice": 99999999999999,
    "hasLift": "",
    "hasParking": "",
    "hasTerrace": "",
    "ownerName": "",
    "mediatorName": "",
    "phoneNumber": "",
    "employName": "",
  }



}
