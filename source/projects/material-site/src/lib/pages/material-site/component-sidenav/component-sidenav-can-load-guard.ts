import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {SECTIONS} from '../../../shared/material-site/documentation-items/documentation-items';

/**
 * Guard to determine if the sidenav can load, based on if the section exists in documentation
 * items.
 */
@Injectable()
export class CanActivateComponentSidenav implements CanActivate {
  constructor(private router: Router) {}

	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):boolean
	{
		// Searches if the section defined the base UrlSegment is a valid section from the documentation items.  If found, returns true to allow activation, otherwise blocks activation and navigates to '/'.
		const sectionFound = Object.keys(SECTIONS).find( (val => val.toLowerCase() === route.url[0].path.toLowerCase()) );
		if( !sectionFound )
			this.router.navigateByUrl('/');
		return sectionFound ? true : false;
	}
}
