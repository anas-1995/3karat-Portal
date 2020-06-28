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
import { StreetService } from '../street.service';

@Component({
  selector: 'app-add-street',
  templateUrl: './add-street.component.html',
  styleUrls: ['./add-street.component.css']
})
export class AddStreetComponent implements OnInit {

  // validatyion variable
  public isSubmitted: boolean = false
  public message: string = "";

  public isUpdate: boolean = false;
  public id: number;


  cities: City[] = []
  locations: Location[] = []
  subLocations: SubLocation[] = []





  streetForm = new FormGroup({
    name: new FormControl("", Validators.required),
    cityId: new FormControl("", Validators.required),
    locationId: new FormControl("", Validators.required),
    subLocationId: new FormControl("", Validators.required)
  });

  // constArray
  public languageKey = this.mainSer.globalServ.getLanguageKey()


  constructor(private mainSer: MainService, private routeSer: ActivatedRoute, private streetSer: StreetService, private subLocationsSer: SubLocationService, private locationsSer: LocationService, private citySer: CityService, private dialogSer: DialogService) {
    var self = this;
    this.routeSer.params.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true
        this.id = params['id']
        this.streetSer.getOneObject(this.id, function (err: appError, data) {
          console.log(data)
          self.streetForm.patchValue(data);
          self.changeCity(false)
          self.changeLocation(false)
        });
      }
    });

  }


  changeCity(deleteLocationId = true) {
    let self = this
    if (this.streetForm.value.locationId != "" && deleteLocationId) {
      this.streetForm.controls.locationId.setValue("");
      this.streetForm.controls.subLocationId.setValue("");
    }
    self.subLocations = []
    self.locationsSer.getAllObject({ "where": { "cityId": this.streetForm.value.cityId } }, function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.locations = data;
    })
  }

  changeLocation(deleteSubLocationId = true) {
    let self = this
    if (this.streetForm.value.subLocationId != "" && deleteSubLocationId)
      this.streetForm.controls.subLocationId.setValue("");
    self.subLocationsSer.getAllObject({ "where": { "locationId": this.streetForm.value.locationId } }, function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.subLocations = data;
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
    let body = this.streetForm.value;
    this.streetSer.createCity(body, function (err: appError, data) {
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
    let body = this.streetForm.value;
    this.streetSer.updateLocation(body, self.id, function (err: appError, data) {
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
    if (this.streetForm.valid == false) {
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
    this.mainSer.globalServ.goTo("list-street")
  }

}

interface marker {
  lat: number;
  lng: number;
  draggable: boolean;
}