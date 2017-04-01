import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {AppComponent} from './app.component';
import {MaterialModule} from '@angular/material';
import {AppRouteModule} from './router/app-route.module';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth/auth-guard.service';
import {AuthenticationService} from './remote/authentication.service';
import {NoAuthGuard} from './auth/no-auth-guard.service';
import {FooterModule} from './footer/footer.module';
import {LogoutComponent} from './logout/logout.component';
import {NotificationService} from './notification/notification.service';
import {GrowlModule} from 'primeng/primeng';
import {CacheModule} from './cache/cache.module';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {ClientSocketService} from './remote/client-socket.service';
import {AdminOrStandardGuard} from './auth/admin-or-standard-guard.service';
import {AdminGuard} from './auth/admin-guard.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Content-Type': 'application/json'}]
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpModule,
    AppRouteModule,
    FooterModule,
    GrowlModule,
    CacheModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    AdminOrStandardGuard,
    AdminGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    ClientSocketService,
    NoAuthGuard,
    AuthenticationService,
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
