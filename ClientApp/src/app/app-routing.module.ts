import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainHeaderComponent} from './shared/main-header/main-header.component';
import {HomeNavigationComponent} from './components/homePages/shared/home-navigation/home-navigation.component';
import {HomePageComponent} from './components/homePages/home-page/home-page.component';
import {ErrorPageComponent} from './shared/error-page/error-page.component';
import { SharedModule } from './shared/shared.module';
import { UserDataResolver } from './components/homePages/shared/user-data.resolver';
import { DataService } from './shared/data.service';

const routes: Routes = [
  {
    path: '', component: MainHeaderComponent, children:
      [
        {
          path: '', component: HomeNavigationComponent, children:
            [
              { path: '', component: HomePageComponent},
              { path: 'error', component: ErrorPageComponent }
            ]
        },
        {
          path: 'admin', loadChildren: () => import('./components/adminPages/shared/admin-routing.module')
          .then(m => m.AdminRoutingModule),     
        }
      ],
      resolve: {datas: UserDataResolver},
  },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers:[UserDataResolver, DataService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
