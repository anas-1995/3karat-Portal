import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.css']
})
export class StatusFilterComponent implements OnInit {

  @Input() statusFilter: any[];
  @Input() currentState: string;
  @Output() changeStatus = new EventEmitter<string>();


  constructor() { }

  changeStatusChild(value) {
    this.changeStatus.next(value)
  }

  ngOnInit() {
  }

}
