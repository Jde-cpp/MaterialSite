import {Component, EventEmitter, NgModule, Output} from '@angular/core';
import {ComponentPageTitle} from '../page-title/page-title';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NavigationFocusModule} from '../../shared/navigation-focus/navigation-focus';

@Component({
  selector: 'component-page-header',
  templateUrl: './component-page-header.html',
  styleUrls: ['./component-page-header.scss']
})
export class ComponentPageHeader {
  constructor(public _componentPageTitle: ComponentPageTitle) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}

@NgModule({
  imports: [MatButtonModule, MatIconModule, NavigationFocusModule],
  exports: [ComponentPageHeader],
  declarations: [ComponentPageHeader],
})
export class ComponentHeaderModule { }
