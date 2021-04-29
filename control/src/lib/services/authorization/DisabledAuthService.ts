import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth } from './IAuth';

@Injectable()
export class DisabledAuthService implements IAuth
{
	enabled():boolean{ return false; }
	login( token:string ){}
	subscribe():Observable<void>{ throw "Disabled"; };
	loggedIn = false;
}
