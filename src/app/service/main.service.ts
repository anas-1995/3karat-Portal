import { TransfereService } from './transfere.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';

@Injectable()
export class MainService {

  constructor(public transfereSer: TransfereService, public routeSer: ActivatedRoute, public loaderSer: LoaderService, public APIServ: ApiService, public authServ: AuthService, public globalServ: GlobalService) { }

  private backUrl = "";
  getBackUrl() {
    return this.backUrl;
  }
  setBackUrl(backUrl) {
    this.backUrl=backUrl;
  }

}
