import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartPageComponent } from './start-page/start-page.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import { AbortDialogComponent } from './abort-dialog/abort-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { LogoutVerificationComponent } from './logout-verification/logout-verification.component';
import { FreundeComponent } from './friendslist/freunde.component';
import { ErrorComponent } from './error/error.component';
import { SaveLocationComponent } from './save-location/save-location.component';
import {MapComponent} from './map/map.component';
import { FriendsDetailComponent } from './friends-detail/friends-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    SidenavContentComponent,
    LoginComponent,
    RegisterComponent,
    AbortDialogComponent,
    LogoutVerificationComponent,
    FreundeComponent,
    ErrorComponent,
    SaveLocationComponent,
    MapComponent,
    FriendsDetailComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
