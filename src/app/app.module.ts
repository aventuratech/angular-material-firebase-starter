import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// initialize firebase
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FirebaseModule} from './lib/firebase/firebase.module';
import { LandingComponent } from './screens/landing/landing.component';
import {AuthModule} from './lib/firebase/lib/auth';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FirebaseModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
