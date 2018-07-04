import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {MailFolderComponent} from './containers/mail-folder/mail-folder.component';
import {MailItemComponent} from './components/mail-item/mail-item.component';
import {MailAppComponent} from './components/mail-app/mail-app.component';
import {MailService} from "./mail.service";
import {MailFolderResolve} from "./containers/mail-folder/mail-folder.resolve";
import {MailViewComponent} from "./components/mail-view/mail-view.component";

export const ROUTES: Routes = [
  {
    path: 'folder/:name',
    component: MailFolderComponent,
    resolve: {
      messages: MailFolderResolve
    }
  },
  {
    path: 'message/:id',
    component: MailViewComponent,
    outlet: 'pane'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    MailFolderComponent,
    MailAppComponent,
    MailViewComponent,
    MailItemComponent
  ],
  providers: [MailService, MailFolderResolve],
  exports: [
    MailAppComponent
  ]
})
export class MailModule {
}
