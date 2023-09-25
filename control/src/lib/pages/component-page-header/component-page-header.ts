import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentPageTitle} from '../page-title/page-title';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'component-page-header',
  templateUrl: './component-page-header.html',
  styleUrls: ['./component-page-header.scss'],
  standalone: true,
  imports: [CommonModule,/*BrowserModule,*/MatButtonModule, MatIconModule]
})
export class ComponentPageHeader {
  constructor(public _componentPageTitle: ComponentPageTitle, private router: Router) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
  @Input()backUrl:string;
  back(){ this.router.navigate([this.backUrl] ); }
}
