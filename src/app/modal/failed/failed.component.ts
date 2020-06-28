import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent implements OnInit {
  @Input() data: any = {};
  errorCode: number;
  errorTitle: number;
  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    console.log(this.data)
    this.errorCode = this.data['errorCode']
    if (this.data['errorTitle'])
      this.errorTitle = this.data['errorTitle']
  }

  close() {
    this.activeModal.close()
  }
}
