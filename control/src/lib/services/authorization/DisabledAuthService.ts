import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IAuth } from './IAuth';

@Injectable()
export class DisabledAuthService implements IAuth{
	get enabled():boolean{ return false; }
	googleAuthClientId():Promise<string>{ return Promise.resolve(null); }
	login( token:string ):Promise<void>{ return Promise.resolve(); }
	loginPassword( username:string, password:string, authenticator:string ):Promise<void>{ return Promise.resolve(); }	
	onLogout():void{}
	subscribe():Observable<string>{ return new Subject<string>().asObservable(); };
	validateSessionId():void{}
	get sessionId(){return "";}; set sessionId(x:string){};
	loggedIn = false;
	idToken = null;
}
