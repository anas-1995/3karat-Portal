import { error } from 'util';
import { FailedComponent } from './../modal/failed/failed.component';
import { MainService } from './main.service';
import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { transition, trigger, style, animate } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../modal/confirm/confirm.component';
import { SuccessComponent } from '../modal/success/success.component';
import { ItemInfoComponent } from '../modal/item-info/item-info.component';


@Injectable()
export class DialogService {

constructor(private mainSer: MainService, private modalService: NgbModal) { }


  confirmMessage(type, callback: Function) {
    var modalRef = this.modalService.open(ConfirmComponent)
    modalRef.result.then((data) => {
      if (data)
        callback()
    }, (reason) => {
    });
    modalRef.componentInstance.type = type;

  }

  successMessage(isUpdate, callback: Function) {
    var modalRef = this.modalService.open(SuccessComponent)
    modalRef.result.then((data) => {
      console.log(data)
      callback()
    }, (reason) => {
    });
    modalRef.componentInstance.isUpdate = isUpdate;

  }

  errorMessage(errorCode: number, callback: Function) {
    var modalRef = this.modalService.open(FailedComponent)
    modalRef.result.then((data) => {
      console.log(data)
    }, (reason) => {
    });
    modalRef.componentInstance.data = { "errorCode": errorCode };
  }

  viewItem(item, callback: Function) {
    var modalRef = this.modalService.open(ItemInfoComponent)
    modalRef.result.then((data) => {
      if (data==true)
        callback()
    }, (reason) => {
    });
    modalRef.componentInstance.item = item;
  }

  changeOrderStatus(order, callback: Function) {
    // var modalRef = this.modalService.open(ChangeOrderStatusComponent)
    // modalRef.result.then((data) => {
    //   if (data)
    //     callback()
    // }, (reason) => {
    // });
    // modalRef.componentInstance.order = order;
  }


}
