import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
  @Input() type: string;
  @Input() placeholder: string;
  @Output() changeValue = new EventEmitter<any[]>();

  value = ""

  constructor() { }

  ngOnInit() {
  }
  changeInput(value) {
    let curentValue = value;
    let self = this
    setTimeout(function () {
      if (self.value == curentValue) {
        self.changeValue.next(curentValue)
      }
    }, 1000);


  }

}
