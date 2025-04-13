import {Component, Inject, Signal, resource} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { EProvider, IAuth, LoggedInUser } from '../../services/authorization/IAuth';
import { IEnvironment } from '../../services/environment/IEnvironment';
import { MatIconModule } from '@angular/material/icon';

declare const gapi: any;
@Component({
	selector: 'authorization', templateUrl: './authorization.html',
	styleUrls: ['./authorization.scss'],
	imports: [MatButtonModule, MatIconModule, RouterLink, RouterLinkActive]})
export class Authorization{
	constructor( @Inject('IAuth') private authService: IAuth ){
		this.user = this.authService.user;
	}
  async onLogout() {
		let x = this.user();
    await this.authService.logout();
		if( this.user().provider == EProvider.Google ){
			var auth2 = gapi.auth2.getAuthInstance();
			await auth2.signOut();
			console.log('User signed out.');
		}
  }
	providers = resource<EProvider[], {}>({
    loader: async () => {
			try{
				return await this.authService.providers();
			}
			catch( e ){
				console.error( e );
				return [];
			}
    }
	});

	user:Signal<LoggedInUser | null>;
}
