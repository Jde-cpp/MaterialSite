import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import {ComponentPageTitle} from '../page-title/page-title';
import {NavigationFocusModule} from '../../shared/navigation-focus/navigation-focus';

@Component({
  selector: 'component-page-header',
  templateUrl: './component-page-header.html',
  styleUrls: ['./component-page-header.scss']
})
export class ComponentPageHeader {
  constructor( public _componentPageTitle: ComponentPageTitle, private router: Router )
	{
	}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
  @Input()backUrl:string;
  back(){ this.router.navigate([this.backUrl] ); }
}

@NgModule({
  imports: [MatButtonModule, MatIconModule, NavigationFocusModule, CommonModule],
  exports: [ComponentPageHeader],
  declarations: [ComponentPageHeader],
})
export class ComponentHeaderModule { }
