import {Component, NgModule, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Router, RouterModule} from '@angular/router';
import {ThemePickerModule} from '../theme-picker/theme-picker';
import {SECTIONS} from '../documentation-items/documentation-items';
import {ThemeStorage} from '../theme-picker/theme-storage/theme-storage';
import {HttpClientModule} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {NavigationFocusService} from '../navigation-focus/navigation-focus.service';
import { AuthorizationModule } from '../authorization/authorization';

const SECTIONS_KEYS = Object.keys(SECTIONS);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBar implements OnDestroy {
  private subscriptions = new Subscription();
  isNextVersion = location.hostname.startsWith('next.material.angular.io');
  skipLinkHref: string|null;
  skipLinkHidden = true;
  routes = [];

  constructor( private navigationFocusService: NavigationFocusService, public router: Router )
  {
		this.routes = router.config.filter( x=>x.path.indexOf(':id')==-1 );
		setTimeout(() => this.skipLinkHref = this.navigationFocusService.getSkipLinkHref(), 100);
  }

  get sections() {
    return SECTIONS;
  }

  get sectionKeys() {
    return SECTIONS_KEYS;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

@NgModule({
  imports: [
	AuthorizationModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    ThemePickerModule
  ],
  exports: [NavBar],
  declarations: [NavBar],
  providers: [ThemeStorage]
})
export class NavBarModule {}
