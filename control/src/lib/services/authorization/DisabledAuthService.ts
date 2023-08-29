import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth } from './IAuth';

@Injectable()
export class DisabledAuthService implements IAuth
{
	get enabled():boolean{ return false; }
	login( token:string ):Promise<void>{ return Promise.resolve(); }
	onLogout():void{}
	googleAuthClientId():Promise<string>{ return Promise.resolve(null); }
	subscribe():Observable<void>{ throw "Disabled"; };
	loggedIn = false;
	idToken = null;
}
