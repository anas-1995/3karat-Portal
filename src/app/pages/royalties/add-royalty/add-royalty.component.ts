import { appError } from './../../../models/app-error.model';
import { DialogService } from './../../../service/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../service/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CityService } from '../../cities/city.service';
import { City } from '../../../models/city.model';
import { Location } from '@angular/common';
import { LocationService } from '../../locations/location.service';
import { SubLocation } from '../../../models/sub-location.model';
import { SubLocationService } from '../../sub-locations/sub-location.service';
import { StreetService } from '../../streets/street.service';
import { Street } from '../../../models/street.model';
import { RoyaltyService } from '../royalty.service';
import { Image } from '../../../models/image.model';

@Component({
  selector: 'app-add-royalty',
  templateUrl: './add-royalty.component.html',
  styleUrls: ['./add-royalty.component.css']
})
export class AddRoyaltyComponent implements OnInit {

  // validatyion variable
  public isSubmitted: boolean = false
  public message: string = "";

  public isUpdate: boolean = false;
  public id: number;
  public arrayImage: Image[] = []


  cities: City[] = []
  locations: Location[] = []
  subLocations: SubLocation[] = []
  streets: Street[] = []



  directions = [{ "value": "east", "title": "east" },
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


  ownerDescriptions = [
    { "value": "frog", "title": "frog" },
    { "value": "property", "title": "property" },
    { "value": "frogProperty", "title": "frogProperty" }
  ]
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


  royaltyForm = new FormGroup({
    cityId: new FormControl("", Validators.required),
    locationId: new FormControl("", Validators.required),
    subLocationId: new FormControl("", Validators.required),
    streetId: new FormControl("", Validators.required),
    typeItem: new FormControl("", Validators.required),
    buildingName: new FormControl(""),
    buildingNumber: new FormControl(""),
    area: new FormControl(0, Validators.required),
    floor: new FormControl("", Validators.required),
    numberRoom: new FormControl("", Validators.required),
    direction: new FormControl("", Validators.required),
    look: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    ownerDescription: new FormControl("", Validators.required),
    cover: new FormControl("", Validators.required),
    typeRoyalty: new FormControl("", Validators.required),
    sellingPrice: new FormControl(0, Validators.required),
    rentingPrice: new FormControl(0, Validators.required),
    hasLift: new FormControl("", Validators.required),
    hasParking: new FormControl("", Validators.required),
    hasTerrace: new FormControl("", Validators.required),
    ownerName: new FormControl("", Validators.required),
    mediatorName: new FormControl(""),
    phoneNumber: new FormControl("", Validators.required),
    mobilePhoneNumber: new FormControl("", Validators.required),
    employName: new FormControl("", Validators.required),
    note: new FormControl(""),
    status: new FormControl("active"),
  });

  // constArray
  public languageKey = this.mainSer.globalServ.getLanguageKey()


  constructor(private mainSer: MainService, private routeSer: ActivatedRoute, private royaltySer: RoyaltyService, private streetSer: StreetService, private subLocationsSer: SubLocationService, private locationsSer: LocationService, private citySer: CityService, private dialogSer: DialogService) {
    var self = this;
    this.routeSer.params.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true
        this.id = params['id']
        this.royaltySer.getOneObject(this.id, function (err: appError, data) {
          console.log(data)
          self.royaltyForm.patchValue(data);
          self.changeCity(false)
          self.changeLocation(false)
          self.changeSubLocation(false)
          self.arrayImage = data.media
        });
      }
    });

  }


  changeCity(deleteLocationId = true) {
    let self = this
    if (this.royaltyForm.value.locationId != "" && deleteLocationId) {
      this.royaltyForm.controls.locationId.setValue("");
      this.royaltyForm.controls.subLocationId.setValue("");
      this.royaltyForm.controls.streetId.setValue("");
    }
    self.subLocations = []
    self.streets = []
    self.locationsSer.getAllObject({ "where": { "cityId": this.royaltyForm.value.cityId } }, function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.locations = data;
    })
  }

  changeLocation(deleteSubLocationId = true) {
    let self = this
    if (this.royaltyForm.value.subLocationId != "" && deleteSubLocationId) {
      this.royaltyForm.controls.subLocationId.setValue("");
      this.royaltyForm.controls.streetId.setValue("");
    }
    self.streets = []
    self.subLocationsSer.getAllObject({ "where": { "locationId": this.royaltyForm.value.locationId } }, function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.subLocations = data;
    })
  }

  changeSubLocation(deleteStreetId = true) {
    let self = this
    if (this.royaltyForm.value.streetId != "" && deleteStreetId)
      this.royaltyForm.controls.streetId.setValue("");
    self.streetSer.getAllObject({ "where": { "subLocationId": this.royaltyForm.value.subLocationId } }, function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.streets = data;
    })
  }

  ngOnInit() {
    var self = this;
    self.citySer.getAllObject(function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.cities = data;
    })

  }

  createObject() {
    let self = this;
    let body = this.royaltyForm.value;
    let images = []
    self.arrayImage.forEach(element => {
      images.push(element.id);
    });
    this.royaltySer.createCity({ "royaltyData": body, "images": images }, function (err: appError, data) {
      if (err) {
        err.returnMessage();
        return;
      }
      self.dialogSer.successMessage(false, function () {
        self.back()
      })
    })
  }

  updateObject() {
    let self = this;
    let body = this.royaltyForm.value;
    let images = []
    self.arrayImage.forEach(element => {
      images.push(element.id);
    });

    this.royaltySer.updateLocation({ "royaltyData": body, "images": images }, self.id, function (err: appError, data) {
      if (err) {
        err.returnMessage();
        return;
      }
      self.dialogSer.successMessage(true, function () {
        self.back()
      })
    })
  }

  onFormSubmit() {
    var self = this;
    if (this.royaltyForm.valid == false) {
      this.isSubmitted = true;
      return
    }
    if (!self.isUpdate) {
      self.createObject();
    }
    else {
      self.updateObject()
    }
  }

  back() {
    this.mainSer.globalServ.goTo("list-royalty")
  }


  imageChangeCallback(data) {
    this.arrayImage = data;
    console.log(data);
  }

}

interface marker {
  lat: number;
  lng: number;
  draggable: boolean;
}