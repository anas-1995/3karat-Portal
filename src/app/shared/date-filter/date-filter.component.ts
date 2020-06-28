import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {

  @Input() dateFilter: any[];
  @Output() changeDate = new EventEmitter<any[]>();

  defaultDateSelected: Date = new Date('1993/03/10');
  constructor() { }

  ngOnInit() {

  }

  changeDateChild(index, type) {
    this.dateFilter.forEach(element => {
      if (element.type == "from" && element.value != null) {
        element.value.setHours(0)
        element.value.setMinutes(0)
        console.log(element)
      } else if (element.type == "to" && element.value != null) {
        element.value.setHours(23)
        element.value.setMinutes(59)
        console.log(element)
      }
    });
    this.changeDate.next(this.dateFilter)
  }

}
