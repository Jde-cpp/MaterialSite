import {Component, NgModule, OnDestroy} from '@angular/core';
import {NgIf, NgFor} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Router, RouterModule} from '@angular/router';
import {ThemePicker} from '../theme-picker/theme-picker';
import {SECTIONS} from '../documentation-items/documentation-items';
import {ThemeStorage} from '../theme-picker/theme-storage/theme-storage';
import {StyleManager} from '../style-manager';
import {HttpClientModule} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {NavigationFocusService} from '../navigation-focus/navigation-focus.service';
import { AuthorizationModule } from '../authorization/authorization';
const SECTIONS_KEYS = Object.keys(SECTIONS);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
	standalone: true,
	imports: [NgIf, MatButtonModule, RouterLink, NgFor, RouterLinkActive, /*VersionPicker,*/ ThemePicker,AuthorizationModule]
})
export class NavBar implements OnDestroy {
  private subscriptions = new Subscription();
  isNextVersion = location.hostname.startsWith('next.material.angular.io');
  skipLinkHref: string | null | undefined;
  skipLinkHidden = true;
  routes = [];
  //get active():bool{ return this.router.url=='/' &&  }
  constructor(private navigationFocusService: NavigationFocusService, public router: Router) {
	this.routes = router.config.filter( x=>x.path.length && x.path.indexOf(':id')==-1 );
	let dflt = this.routes.find( x=>x.component.name==router.config.find( x=>!x.path.length )?.component.name );
	if( dflt )
		dflt.default = true;
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
