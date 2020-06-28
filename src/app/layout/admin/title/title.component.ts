import { MainService } from './../../../service/main.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-title',
  template: '<span></span>'
})
export class TitleComponent {
  constructor(private router: Router, private mainSer: MainService, private route: ActivatedRoute, private titleService: Title) {
    let self = this
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        let currentRoute = this.route.root;
        let title = '';
        let pageTitle = ""
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(routes => {
            if (routes.outlet === 'primary') {
              pageTitle = routes.snapshot.data['pageTitle'];
              title = routes.snapshot.data.breadcrumb;
              currentRoute = routes;
            }
          });
        } while (currentRoute);
        this.mainSer.globalServ.translate(["TITLESPAGE." + pageTitle], function (data) {
          self.titleService.setTitle(data["TITLESPAGE." + pageTitle]);
        })
      });
  }
}
