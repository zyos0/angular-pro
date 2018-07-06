import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PreloadingStrategy, Route, RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {AuthGuard} from "./auth/auth.guard";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {MailModule} from './mail/mail.module';

import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";

export class CustomPreload implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data.preload ? fn() : Observable.of(null);
  }
}

export const ROUTES: Routes = [
  {path: 'dashboard', canLoad:[AuthGuard], loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path: '**', redirectTo: 'mail/folder/inbox'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [CustomPreload],
  imports: [
    AuthModule,
    BrowserModule,
    HttpModule,
    MailModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: CustomPreload})
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
