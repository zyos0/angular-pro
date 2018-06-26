import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef, TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {User} from './auth-form/auth-form.interface';
import {AuthFormComponent} from "./auth-form/auth-form.component";

@Component({
  selector: 'app-root',
  template: `
    <div>
      <template #tmpl let-name let-location="location">
        {{name}} : {{location}}
      </template>
      <div #entry></div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {
  component: ComponentRef<AuthFormComponent>;

  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
  @ViewChild('tmpl') tmpl: TemplateRef<any>;


  ngAfterContentInit() {
    this.entry.createEmbeddedView(this.tmpl,{
      $implicit:"Motto Todd",
      location:'England, UK'
    });
  }
}
