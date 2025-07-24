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

export class LoggedInUser{
	constructor( jwtString:string ){
		if( !jwtString )
			return;
		const jwt = LoggedInUser.decodeJwt( jwtString );
		this.credential = jwtString;
		this.email = jwt.email;
		this.name = jwt.name;
		this.picture = jwt.picture;
		this.exp = new Date( jwt.exp * 1000 );
		if( jwt.iss=="https://accounts.google.com" )
			this.provider = EProvider.Google;
	}

	static decodeJwt(idToken: string):any{
		const base64Url = idToken.split( "." )[1];
		const base64 = base64Url.replace( /-/g, "+" ).replace( /_/g, "/" );
		const jsonPayload = decodeURIComponent(
			window.atob( base64 ).split("")
				.map( (c)=>"%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2) )
				.join("")
		);
		return JSON.parse( jsonPayload );
	}
	toString():string{
		const { credential, ...rest } = this;
		return JSON.stringify( rest );
	}
  id?: string; //loginName
	authorization?: string; //sessionId
	credential?: string; //jwt token
	domain?: string;
	exp?: Date;	//expiration
  email?: string;
	name?: string;
  picture?: string;
	provider?: EProvider;
	serverInstances?:{url:string,instance:number}[];
}

export interface IAuth{
	login( user:LoggedInUser ):Promise<void>;
	loginPassword( username:string, password:string, authenticator:string ):Promise<void>;
	logout( user:LoggedInUser ):Promise<void>;
	providers():Promise<EProvider[]>;
	validateSessionId():void;
	googleAuthClientId():Promise<string>;
	user:Signal<LoggedInUser | null>;
}