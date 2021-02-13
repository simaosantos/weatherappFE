import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';


import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { ChartsModule } from 'ng2-charts';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component'

import { BrowserModule } from '@angular/platform-browser';

import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  imports: [
    ChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
 
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    

  ],
  declarations: [
    AppComponent,
    DashboardComponent

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[  ]
})
export class AppModule { }
