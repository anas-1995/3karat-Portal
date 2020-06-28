import { InputSearchComponent } from './shared/input-search/input-search.component';
import { TransfereService } from './service/transfere.service';
import { AgmCoreModule } from '@agm/core';
import { SelectModule } from 'ng-select';
import { DatepickerModule } from 'angular2-material-datepicker';
import { DateFilterComponent } from './shared/date-filter/date-filter.component';
import { StatusFilterComponent } from './shared/status-filter/status-filter.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UploadImgService } from './shared/upload-img/upload-img.service';
import { UploadImgComponent } from './shared/upload-img/upload-img.component';
import { TableComponent } from './shared/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { GlobalService } from './service/global.service';
import { MainService } from './service/main.service';
import { AuthGuardService } from './service/auth-guard.service';
import { AppDirectionService } from './service/app-direction.service';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSortableModule } from 'ngx-sortable'
// import { DndListModule } from 'ngx-drag-and-drop-lists';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutes } from './app.routing';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './layout/admin/title/title.component';
import { AuthComponent } from './layout/auth/auth.component';
import { LoaderService } from './service/loader.service';
import { ApiService } from './service/api.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { DialogService } from './service/dialog.service';
import { ConfirmComponent } from './modal/confirm/confirm.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from './modal/success/success.component';
import { FailedComponent } from './modal/failed/failed.component';
// import { Ng2ImgMaxModule } from 'ng2-img-max';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CommonModule } from '@angular/common';
import { loginComponent } from './pages/login/login.component';
import { LoginService } from './pages/login/login.service';
import { ListCityComponent } from './pages/cities/list-city/list-city.component';
import { CityService } from './pages/cities/city.service';
import { AddCityComponent } from './pages/cities/add-city/add-city.component';
import { ListLocationComponent } from './pages/locations/list-location/list-location.component';
import { LocationService } from './pages/locations/location.service';
import { AddLocationComponent } from './pages/locations/add-locations/add-location.component';
import { SubLocationService } from './pages/sub-locations/sub-location.service';
import { ListSubLocationComponent } from './pages/sub-locations/list-sub-location/list-sub-location.component';
import { AddSubLocationComponent } from './pages/sub-locations/add-sub-location/add-sub-location.component';
import { ListStreetComponent } from './pages/streets/list-street/list-street.component';
import { StreetService } from './pages/streets/street.service';
import { AddStreetComponent } from './pages/streets/add-street/add-street.component';
import { AddRoyaltyComponent } from './pages/royalties/add-royalty/add-royalty.component';
import { RoyaltyService } from './pages/royalties/royalty.service';
import { ListRoyaltyComponent } from './pages/royalties/list-royalty/list-royalty.component';
import { ItemInfoComponent } from './modal/item-info/item-info.component';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/languages/', '.json');

}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    TitleComponent,
    AuthComponent,

    // pages
    // // home
    // HomeComponent,

    // // abstract
    // AddAbtractProductsComponent, ListAbstractProductComponent, ShowAbstractProductComponent, AbstractProductOrderComponent,

    // // Royalty
    ListRoyaltyComponent,AddRoyaltyComponent,

    // // street
    ListStreetComponent, AddStreetComponent,

    // sub location
    ListSubLocationComponent, AddSubLocationComponent,
    // // city
    ListCityComponent, AddCityComponent,

    // // location
    ListLocationComponent, AddLocationComponent,

    // // auth
    loginComponent,

    // // others
    TableComponent, UploadImgComponent, StatusFilterComponent, DateFilterComponent, InputSearchComponent,



    // // dialog
    ConfirmComponent, SuccessComponent, FailedComponent, ItemInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, { enableTracing: false, useHash: true }),
    ClickOutsideModule,
    AngularFontAwesomeModule,
    SharedModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SelectModule,
    NgxSortableModule,
    NgbModule.forRoot(),
    PaginationModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyArvKKYtpC6C6khvDPT_HAWG5hXMiKwakk'
    }),
    // Ng2ImgMaxModule,
    DatepickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  providers: [
    HttpClient,
    // main services
    AppDirectionService, AuthGuardService, MainService, GlobalService, AuthService, LoaderService, ApiService, DialogService, TransfereService,
    // pages services
    CityService, LoginService, LocationService, SubLocationService, StreetService, RoyaltyService,
    UploadImgService,
    // others
    NgbActiveModal
  ],
  entryComponents: [
    ConfirmComponent,
    FailedComponent,
    SuccessComponent,
    ItemInfoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }