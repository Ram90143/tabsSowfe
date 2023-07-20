import { ExcelService } from 'src/app/shared/Services/ExcelService/excel.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardComponent } from './guards/AuthGuard/auth-guard/auth-guard.component';
import { CanDeactivateGuardComponent } from './guards/CanDeactivateGuard/can-deactivate-guard/can-deactivate-guard.component';
import { HeaderComponent } from './header/header.component';
import { SecurityComponent } from './shared/Common/security/security.component';
import { ServerDownComponent } from './shared/Common/server-down/server-down.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateDetailsComponent } from './candidate/candidate-details/candidate-details.component';
import { SoDetailsComponent } from './so/so-details/so-details.component';
import { SoListComponent } from './so/so-list/so-list.component';



import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort'
import { HttpClientModule } from '@angular/common/http';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/Services/LoginService/login.service';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthGuardComponent,
    CanDeactivateGuardComponent,
    HeaderComponent,
    SecurityComponent,
    ServerDownComponent,
    CandidateDetailsComponent,
    CandidateListComponent,
    SoDetailsComponent,
    SoListComponent,
    LoginComponent,
    AdminComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatFormFieldModule, MatSortModule,
    MatPaginatorModule, MatTableModule, MatSlideToggleModule, MatInputModule,HttpClientModule,MatButtonModule,
    ReactiveFormsModule,MatRadioModule,MatSelectModule,MatTreeModule,MatGridListModule, MatPaginatorModule,
    MatListModule,MatListModule,MatSidenavModule,MatIconModule,MatIconModule,MatCardModule,MatTabsModule,
    MatToolbarModule,MatExpansionModule,MatMenuModule,MatCheckboxModule,FormsModule,MatTreeModule,MatStepperModule,
    MatProgressBarModule,MatDatepickerModule,MatTooltipModule,MatNativeDateModule,MatButtonToggleModule, MatMenuModule
  ],
  providers: [ExcelService,LoginService],
  bootstrap: [AppComponent],
})
export class AppModule { }
