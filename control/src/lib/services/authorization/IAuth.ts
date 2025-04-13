import { Signal } from '@angular/core';
import { IEnum } from 'jde-framework';

export enum EProvider{
	None = 0,
	Google=1,
	Facebook=2,
	Amazon=3,
	Microsoft=4,
	VK=5,
	Key = 6,
	OpcServer = 7
};

export type LoggedInUser = {
  id?: string;
	authorization?: string; //sessionId
	credential?: string;
	domain?: string;
	expiration?: Date;
  email?: string;
	name?: string;
  pictureUrl?: string;
	provider?: EProvider;
	serverInstance?:number;
}

export interface IAuth{
	loginGoogle( user:LoggedInUser ):Promise<void>;
	loginPassword( username:string, password:string, authenticator:string ):Promise<void>;
	logout():Promise<void>;
	providers():Promise<EProvider[]>;
	validateSessionId():void;
	//subscribe():Observable<string>;
	googleAuthClientId():Promise<string>;
	//onLogout():void;
	//get sessionId(); set sessionId(x:string);
	//readonly enabled:boolean;
	//loggedIn:boolean;
	//idToken:string;
	user:Signal<LoggedInUser | null>;
}