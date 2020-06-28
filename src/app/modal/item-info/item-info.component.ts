import { MainService } from './../../service/main.service';
import { Component, Input, OnInit } from '@angular/core';




import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  @Input() item;


  constructor(public activeModal: NgbActiveModal, private mainSer: MainService) {
  }





  ngOnInit() {
    console.log(this.item)
  }

  changeState() {
    this.activeModal.close(true)
  }
  close() {
    this.activeModal.close()
  }

  chnage() {

  }
}
