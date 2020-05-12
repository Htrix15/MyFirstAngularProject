import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EditExperienceComponent} from '../edit-experience/edit-experience.component';
import {EditOtherComponent} from '../edit-other/edit-other.component';
import {EditSkillsComponent} from '../edit-skills/edit-skills.component';
import {AdminNavigationComponent} from './admin-navigation/admin-navigation.component';
import {ErrorPageComponent} from '../../../shared/error-page/error-page.component';
import {LogonComponent} from '../logon/logon.component';
import {EditEducationComponent} from '../edit-education/edit-education.component';
import { SharedModule } from '../../../shared/shared.module';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ChangeUserData } from './change-user-data.guard';
import { AuthService } from './auth.service';

const routes: Routes = [
  {
    path: '', component: AdminNavigationComponent, children:
      [
        { path: '', component: LogonComponent },
        { path: 'logon', component: LogonComponent},
        { path: 'experience', component: EditExperienceComponent},
        { path: 'other', component: EditOtherComponent},
        { path: 'skills', component: EditSkillsComponent},
        { path: 'education', component: EditEducationComponent},
        { path: 'user', component: EditUserComponent, canActivate: [ChangeUserData]},
        { path: 'error', component: ErrorPageComponent},
        { path: '**', redirectTo: 'error'}
      ],
  }
];

@NgModule({
  declarations: [
    AdminNavigationComponent,
    LogonComponent,
    EditExperienceComponent,
    EditOtherComponent,
    EditSkillsComponent,
    EditEducationComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers:[ChangeUserData, AuthService],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
