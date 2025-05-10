import {Component, Inject, Signal, resource} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { EProvider, IAuth, LoggedInUser } from '../../services/authorization/IAuth';
import { MatIconModule } from '@angular/material/icon';

declare const gapi: any;
@Component( {
	selector: "authorization", templateUrl: "./authorization.html", styleUrls: ["./authorization.scss"],
	imports: [MatButtonModule, MatIconModule, RouterLink, RouterLinkActive]} )
export class Authorization{
	constructor( @Inject("IAuth") private authService: IAuth ){
		this.user = this.authService.user;
	}
  async onLogout() {
    await this.authService.logout( this.user() );
		if( this.user().provider == EProvider.Google ){
			var auth2 = gapi.auth2.getAuthInstance();
			await auth2.signOut();
			console.log("User signed out.");
		}
  }
	providers = resource<EProvider[], {}>({
    loader: async () => {
			try{
				let providers = await this.authService.providers();
				return providers;
			}
			catch( e ){
				console.error( e );
				return [];
			}
    }
	});

	user:Signal<LoggedInUser | null>;
}