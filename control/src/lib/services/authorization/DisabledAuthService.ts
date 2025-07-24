import { Injectable, Signal, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EProvider, IAuth, LoggedInUser } from './IAuth';

@Injectable()
export class DisabledAuthService implements IAuth{
	get enabled():boolean{ return false; }
//	googleAuthClientId():Promise<string>{ return Promise.resolve(null); }
	login( user:LoggedInUser ):Promise<void>{ throw "noImpl"; }
	loginPassword( username:string, password:string, authenticator:string ):Promise<void>{ throw "noImpl"; }
	logout():Promise<void>{ return Promise.resolve(); }
	providers():Promise<EProvider[]>{ return Promise.resolve( [] ); }
	googleAuthClientId():Promise<string>{ throw "noImpl"; }
	validateSessionId():void{ throw "noImpl";}

	get user():Signal<LoggedInUser | null>{ return signal<LoggedInUser | null>(null); }

/*	onLogout():void{}
	subscribe():Observable<string>{ return new Subject<string>().asObservable(); };
	get sessionId(){return "";}; set sessionId(x:string){};
	loggedIn = false;
	idToken = null;*/
}
