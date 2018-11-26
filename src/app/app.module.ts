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
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from 'src/environments/firebase.config';
import { AngularFireModule } from '@angular/fire';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { AuthService } from './shared/security/auth.service';
import { AuthGuard } from './shared/security/auth.guard';
import { HttpModule } from '@angular/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { SubscriptionPageModule } from './pages/subscription/subscription.module';
import { ContactPageModule } from './pages/contact/contact.module';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { UsersService } from './services/users.service';
import { SubscriptionsService } from './services/subscriptions.service';
import { SneakerService } from './services/sneaker.service';
import { EmailService } from './services/email.service';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent, SafeUrlPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ComponentsModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    ContactPageModule,
    SubscriptionPageModule],
  providers: [
    UsersService,
    SubscriptionsService,
    SneakerService,
    AuthService,
    AuthGuard,
    EmailComposer,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EmailService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
