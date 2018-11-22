import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

import {ReactiveFormsModule} from '@angular/forms';
import { UsersService } from './shared/model/users.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from 'src/environments/firebase.config';
import { AngularFireModule } from '@angular/fire';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { AuthService } from './shared/security/auth.service';
import { AuthGuard } from './shared/security/auth.guard';
import { HttpModule } from '@angular/http';
import { AngularFireAuthModule } from 'angularfire2/auth';


@NgModule({
  declarations: [AppComponent, SafeUrlPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ComponentsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule],
  providers: [
    UsersService,
    AuthService,
    AuthGuard,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
