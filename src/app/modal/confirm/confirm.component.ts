import { Component, Input, OnInit } from '@angular/core';




import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input() type;
  public title: string;
  public yesButton: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if (this.type == 'archive') {
      this.title = "YOUWANTTOARCHIVE"
      this.yesButton = "YESARCHIVEIT"
    }
    else if (this.type == 'delete') {
      this.title = "YOUWANTTODELETE"
      this.yesButton = "YESDELETEIT"
    }
    else if (this.type == 'CHANGEORDER') {
      this.title = "YOUWANTTOCHANGEABSTRACTPRODUCTSORDER"
      this.yesButton = "YESCHANGE"
    }
  }

  close() {
    this.activeModal.close()
  }

  yes() {
    this.activeModal.close(true)
  }
}
