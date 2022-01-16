import { Observable } from "rxjs";

export interface IAuth
{
	enabled():boolean;
	login( token?:string ):Promise<void>;
	//subscribe():Promise<void>;
	loggedIn:boolean;
	idToken:string;
	//init( button:HTMLElement ):void;
}