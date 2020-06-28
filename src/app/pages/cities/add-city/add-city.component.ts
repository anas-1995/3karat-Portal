import { appError } from './../../../models/app-error.model';
import { DialogService } from './../../../service/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../service/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  // validatyion variable
  public isSubmitted: boolean = false
  public message: string = "";

  public isUpdate: boolean = false;
  public id: number;




  cityForm = new FormGroup({
    name: new FormControl("", Validators.required)
  });

  // constArray
  public languageKey = this.mainSer.globalServ.getLanguageKey()


  constructor(private mainSer: MainService, private routeSer: ActivatedRoute, private citySer: CityService, private dialogSer: DialogService) {
    var self = this;
    this.routeSer.params.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true
        this.id = params['id']
        this.citySer.getOneObject(this.id, function (err: appError, data) {
          self.cityForm.patchValue(data);

        });
      }
    });

  }

  ngOnInit() {
    var self = this;

  }

  createObject() {
    let self = this;
    let body = this.cityForm.value;
    this.citySer.createCity(body, function (err: appError, data) {
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
    let body = this.cityForm.value;
    this.citySer.updateCity(body, self.id, function (err: appError, data) {
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
    if (this.cityForm.valid == false) {
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
    this.mainSer.globalServ.goTo("list-city")
  }

}

interface marker {
  lat: number;
  lng: number;
  draggable: boolean;
}