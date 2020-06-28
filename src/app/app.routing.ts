import { AuthGuardService } from './service/auth-guard.service';
import { Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { loginComponent } from './pages/login/login.component';
import { ListCityComponent } from './pages/cities/list-city/list-city.component';
import { AddCityComponent } from './pages/cities/add-city/add-city.component';
import { ListLocationComponent } from './pages/locations/list-location/list-location.component';
import { AddLocationComponent } from './pages/locations/add-locations/add-location.component';
import { ListSubLocationComponent } from './pages/sub-locations/list-sub-location/list-sub-location.component';
import { AddSubLocationComponent } from './pages/sub-locations/add-sub-location/add-sub-location.component';
import { ListStreetComponent } from './pages/streets/list-street/list-street.component';
import { AddStreetComponent } from './pages/streets/add-street/add-street.component';
import { AddRoyaltyComponent } from './pages/royalties/add-royalty/add-royalty.component';
import { ListRoyaltyComponent } from './pages/royalties/list-royalty/list-royalty.component';

export const AppRoutes: Routes = [
  {
    path: 'login',
    component: loginComponent,
    data: {
      "pageTitle": "LOGIN"
    }
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'list-city',
        component: ListCityComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "CITY"
        }
      },
      {
        path: 'list-location',
        component: ListLocationComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "LOCATION"
        }
      },
      {
        path: 'list-sub-location',
        component: ListSubLocationComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "SUBLOCATION"
        }
      },
      {
        path: 'list-street',
        component: ListStreetComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "STREET"
        }
      },
      {
        path: 'add-royalty',
        component: AddRoyaltyComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "ROYALTY"
        }
      },
      {
        path: 'edit-royalty/:id',
        component: AddRoyaltyComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "ROYALTY"
        }
      },
      {
        path: 'list-royalty',
        component: ListRoyaltyComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "ROYALTY"
        }
      },
      {
        path: 'add-street',
        component: AddStreetComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "STREET"
        }
      },
      {
        path: 'edit-street/:id',
        component: AddStreetComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "STREET"
        }
      },
      {
        path: 'add-sub-location',
        component: AddSubLocationComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "SUBLOCATION"
        }
      },
      {
        path: 'edit-sub-location/:id',
        component: AddSubLocationComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "SUBLOCATION"
        }
      },
      {
        path: 'add-city',
        component: AddCityComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "CITY"
        }
      },
      {
        path: 'add-location',
        component: AddLocationComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "LOCATION"
        }
      },
      {
        path: 'edit-location/:id',
        component: AddLocationComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "LOCATION"
        }
      },

      {
        path: 'edit-city/:id',
        component: AddCityComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "CITY"
        }
      },

      // {
      //   path: 'list-user',
      //   component: ListUserComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "LISTUSER"
      //   }

      // },
      // {
      //   path: 'list-staf-user',
      //   component: ListStafUserComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "LISTSTAFUSER"
      //   }

      // },
      // {
      //   path: 'add-user',
      //   component: AddUserComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "ADDUSER"
      //   }
      // },
      // {
      //   path: 'add-center-product/:centerId',
      //   component: AddCenterProductComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "ADDCENTERPRODUCT"
      //   }
      // },
      // {
      //   path: 'edit-center-product/:centerId/:id',
      //   component: AddCenterProductComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "EDITCENTERPRODUCT"
      //   }
      // },
      // {
      //   path: 'list-order',
      //   component: ListOrderComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "LISTORDER"
      //   }
      // },



      // {
      //   path: 'dashboard',
      //   loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
      // }, {
      //   path: 'widget',
      //   loadChildren: './pages/widget/widget.module#WidgetModule'
      // }, {
      //   path: 'basic',
      //   loadChildren: './pages/ui-elements/basic/basic.module#BasicModule'
      // }, {
      //   path: 'advance',
      //   loadChildren: './pages/ui-elements/advance/advance.module#AdvanceModule'
      // }, {
      //   path: 'animations',
      //   loadChildren: './pages/animations/animations.module#AnimationsModule'
      // },
      // {
      //   path: 'forms',
      //   loadChildren: './pages/ui-elements/forms/forms.module#FormsModule'
      // },
      //  {
      //   path: 'bootstrap-table',
      //   loadChildren: './pages/ui-elements/tables/bootstrap-table/bootstrap-table.module#BootstrapTableModule',
      // }, {
      //   path: 'data-table',
      //   loadChildren: './pages/ui-elements/tables/data-table/data-table.module#DataTableModule',
      // }, {
      //   path: 'charts',
      //   loadChildren: './pages/charts/charts.module#ChartsModule',
      // }, {
      //   path: 'map',
      //   loadChildren: './pages/map/map.module#MapModule',
      // }, {
      //   path: 'maintenance/error',
      //   loadChildren: './pages/maintenance/error/error.module#ErrorModule'
      // }, {
      //   path: 'maintenance/coming-soon',
      //   loadChildren: './pages/maintenance/coming-soon/coming-soon.module#ComingSoonModule'
      // }, {
      //   path: 'user',
      //   loadChildren: './pages/user/user.module#UserModule'
      // }, {
      //   path: 'crm-contact',
      //   loadChildren: './pages/ui-elements/crm-contact/crm-contact.module#CrmContactModule'
      // }, {
      //   path: 'task',
      //   loadChildren: './pages/task/task.module#TaskModule'
      // }, {
      //   path: 'editor',
      //   loadChildren: './pages/ui-elements/editor/editor.module#EditorModule'
      // }, {
      //   path: 'invoice',
      //   loadChildren: './pages/invoice/invoice.module#InvoiceModule'
      // }, {
      //   path: 'file-upload',
      //   loadChildren: './pages/ui-elements/file-upload/file-upload.module#FileUploadUIModule'
      // }, {
      //   path: 'change-log',
      //   loadChildren: './pages/change-log/change-log.module#ChangeLogModule'
      // }, {
      //   path: 'simple-page',
      //   loadChildren: './pages/simple-page/simple-page.module#SimplePageModule'
      // },

    ]
  },

  // { path: '/', component: ListOrderComponent, pathMatch: 'full' }
  //  {
  //   path: '',
  //   component: AuthComponent,
  //   children: [
  //     {
  //       path: 'authentication',
  //       loadChildren: './pages/authentication/authentication.module#AuthenticationModule'
  //     }, {
  //       path: 'maintenance/offline-ui',
  //       loadChildren: './pages/maintenance/offline-ui/offline-ui.module#OfflineUiModule'
  //     }
  //   ]
  // }

];
