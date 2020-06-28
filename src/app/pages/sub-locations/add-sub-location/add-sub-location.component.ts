import { IOption } from 'ng-select';
import { appError } from './../../../models/app-error.model';
import { DialogService } from './../../../service/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../service/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CityService } from '../../cities/city.service';
import { City } from '../../../models/city.model';
import { Location } from '@angular/common';
import { SubLocationService } from '../sub-location.service';
import { LocationService } from '../../locations/location.service';

@Component({
  selector: 'app-add-sub-location',
  templateUrl: './add-sub-location.component.html',
  styleUrls: ['./add-sub-location.component.css']
})
export class AddSubLocationComponent implements OnInit {

  // validatyion variable
  public isSubmitted: boolean = false
  public message: string = "";

  public isUpdate: boolean = false;
  public id: number;


  cities: City[] = []
  locations: Location[] = []





  subLocationForm = new FormGroup({
    name: new FormControl("", Validators.required),
    cityId: new FormControl("", Validators.required),
    locationId: new FormControl("", Validators.required)
  });

  // constArray
  public languageKey = this.mainSer.globalServ.getLanguageKey()


  constructor(private mainSer: MainService, private routeSer: ActivatedRoute, private subLocationsSer: SubLocationService, private locationsSer: LocationService, private citySer: CityService, private dialogSer: DialogService) {
    var self = this;
    this.routeSer.params.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true
        this.id = params['id']
        this.subLocationsSer.getOneObject(this.id, function (err: appError, data) {
          console.log(data)
          self.subLocationForm.patchValue(data);
          self.changeCity(false)
        });
      }
    });

  }


  changeCity(deleteLocationId = true) {
    let self = this
    if (this.subLocationForm.value.locationId != "" && deleteLocationId)
      this.subLocationForm.controls.locationId.setValue("");
    self.locationsSer.getAllObject({ "where": { "cityId": this.subLocationForm.value.cityId } }, function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.locations = data;
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
    let body = this.subLocationForm.value;
    this.subLocationsSer.createCity(body, function (err: appError, data) {
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
    let body = this.subLocationForm.value;
    this.subLocationsSer.updateLocation(body, self.id, function (err: appError, data) {
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
    if (this.subLocationForm.valid == false) {
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
    this.mainSer.globalServ.goTo("list-sub-location")
  }

}

interface marker {
  lat: number;
  lng: number;
  draggable: boolean;
}