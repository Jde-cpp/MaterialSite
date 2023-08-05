import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth } from './IAuth';

@Injectable()
export class DisabledAuthService implements IAuth
{
	get enabled():boolean{ return false; }
	login( token:string ):Promise<void>{ return Promise.resolve(); }
	subscribe():Observable<void>{ throw "Disabled"; };
	loggedIn = false;
	idToken = null;
}
