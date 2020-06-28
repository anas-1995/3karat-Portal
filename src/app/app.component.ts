import { MainService } from './service/main.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet><app-spinner></app-spinner></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(mainSer: MainService, private translate: TranslateService, private route: ActivatedRoute) {
    translate.setDefaultLang('ar');
  }
}
