import { Observable } from "rxjs";

export interface IAuth
{
	enabled():boolean;
	login( token:string );
	subscribe():Observable<void>;
	loggedIn:boolean;
	idToken:string;
	//init( button:HTMLElement ):void;
}