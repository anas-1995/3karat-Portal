import { appError } from './../../../models/app-error.model';
import { DialogService } from './../../../service/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../service/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CityService } from '../../cities/city.service';
import { LocationService } from '../location.service';
import { City } from '../../../models/city.model';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  // validatyion variable
  public isSubmitted: boolean = false
  public message: string = "";

  public isUpdate: boolean = false;
  public id: number;


  cities: City[] = []




  locationForm = new FormGroup({
    name: new FormControl("", Validators.required),
    cityId: new FormControl("", Validators.required)
  });

  // constArray
  public languageKey = this.mainSer.globalServ.getLanguageKey()


  constructor(private mainSer: MainService, private routeSer: ActivatedRoute, private locationsSer: LocationService, private citySer: CityService, private dialogSer: DialogService) {
    var self = this;
    this.routeSer.params.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true
        this.id = params['id']
        this.locationsSer.getOneObject(this.id, function (err: appError, data) {
          console.log(data)
          self.locationForm.patchValue(data);

        });
      }
    });

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
    let body = this.locationForm.value;
    this.locationsSer.createCity(body, function (err: appError, data) {
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
    let body = this.locationForm.value;
    this.locationsSer.updateLocation(body, self.id, function (err: appError, data) {
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
    if (this.locationForm.valid == false) {
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
    this.mainSer.globalServ.goTo("list-location")
  }

}

interface marker {
  lat: number;
  lng: number;
  draggable: boolean;
}