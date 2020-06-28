import { MainService } from './../../service/main.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: [any];
  @Input() fields: [string];
  @Input() count: number;
  @Input() limit: number;
  @Input() currentPage: number;
  @Input() withPage: boolean = true;

  @Output() actionOnRow = new EventEmitter<any>();
  @Output() changePage = new EventEmitter<number>();


  constructor(private mainSer: MainService) { }

  pageChanged(event) {
    this.changePage.next(event.page);

  }


  action(id, event, index) {
    this.actionOnRow.next({ "id": id, "event": event, "index": index });
  }
  ngOnInit() {
    console.log(this.data);
    console.log(this.fields);
  }

  checkCondition(onerow, condition) {
    for (let index = 0; index < condition.length; index++) {
      const element = condition[index];
      var value = this.getByStringKey(onerow, element.key);
      switch (element.operator) {
        case "==": {
          if (!(value == element.value))
            return false
          else
            break;
        }
        case "!=": {
          if (!(value != element.value))
            return false
          else
            break;
        }
      }
    }
    return true
  }



  getByStringKey(object, keyString) {
    return this.mainSer.globalServ.getByStringKey(object, keyString)
  }

  getFromMultiValue(object, fielde) {
    if (!fielde.isMultiLevel)
      var value = object[fielde.key]
    for (let index = 0; index < fielde.state.length; index++) {
      const element = fielde.state[index];
      if (element.value == value) {
        return element
      }
    }
  }

  formatDate(date, viewTime) {
    return this.mainSer.globalServ.formatDate(date, viewTime)
  }

}
