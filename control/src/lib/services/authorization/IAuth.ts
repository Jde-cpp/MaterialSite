//import { Observable } from "rxjs";

export interface IAuth
{

	login( token?:string ):Promise<void>;
	googleAuthClientId():Promise<string>;
	onLogout():void;

	readonly enabled:boolean;
	loggedIn:boolean;
	idToken:string;
	//init( button:HTMLElement ):void;
}