import { Signal } from '@angular/core';

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
  id?: string; //loginName
	authorization?: string; //sessionId
	credential?: string; //jwt token
	domain?: string;
	expiration?: Date;
  email?: string;
	name?: string;
  pictureUrl?: string;
	provider?: EProvider;
	serverInstances?:{url:string,instance:number}[];
}

export interface IAuth{
	loginGoogle( user:LoggedInUser ):Promise<void>;
	loginPassword( username:string, password:string, authenticator:string ):Promise<void>;
	logout( user:LoggedInUser ):Promise<void>;
	providers():Promise<EProvider[]>;
	validateSessionId():void;
	googleAuthClientId():Promise<string>;
	user:Signal<LoggedInUser | null>;
}