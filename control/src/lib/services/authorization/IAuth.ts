import { Observable } from "rxjs";

export interface IAuth{
	login( token?:string ):Promise<void>;
	loginPassword( username:string, password:string, authenticator:string ):Promise<void>;
	subscribe():Observable<string>;
	googleAuthClientId():Promise<string>;
	onLogout():void;
	validateSessionId():void;

	//get sessionId(); set sessionId(x:string);

	readonly enabled:boolean;
	loggedIn:boolean;
	idToken:string;
}