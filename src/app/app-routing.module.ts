import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateDetailsComponent } from './candidate/candidate-details/candidate-details.component';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { SoDetailsComponent } from './so/so-details/so-details.component';
import { SoListComponent } from './so/so-list/so-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from 'src/app/login/login.component';
import { TechnologyComponent } from './technology/technology.component';
import { DomainComponent } from './domain/domain.component';
import { CandidateMappingComponent } from './candidate-mapping/candidate-mapping.component';
import { RegistrationComponent } from './registration/registration.component';
import { SecurityComponent } from './shared/Common/security/security.component';
import { ServerDownComponent } from './shared/Common/server-down/server-down.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';

const routes: Routes = [

  {path:'',redirectTo:'/login',pathMatch:'full'},

  {path:'candidatedetails',component:CandidateDetailsComponent,canActivate:[AuthGuard]},
  {path:'sow',component:SoDetailsComponent,canActivate:[AuthGuard]},
  {path:'mapping',component:CandidateMappingComponent,canActivate:[AuthGuard]},
  {path:'domain',component:DomainComponent,canActivate:[AuthGuard]},
  {path:'technology',component:TechnologyComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'soList',component:SoListComponent,canDeactivate:[CanDeactivateGuardService]},
  {path:'candidateList',component:CandidateListComponent,canDeactivate:[CanDeactivateGuardService]},
  {path:'registration',component:RegistrationComponent,canActivate:[AuthGuard]},
  {path:'ChangePassword',component:ChangePasswordComponent,canActivate:[AuthGuard]},
  {path:'server-down',component:ServerDownComponent},
  {path:'securityPage',component:SecurityComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
