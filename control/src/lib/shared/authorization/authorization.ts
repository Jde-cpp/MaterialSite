import {AfterViewInit, Component, NgModule, Inject, OnInit} from '@angular/core';
import { timeout } from 'rxjs/operators';
import { IAuth } from '../../services/authorization/IAuth';

declare const gapi: any;//<script src="https://apis.google.com/js/platform.js" async defer></script>

@Component({ selector: 'authorization', templateUrl: './authorization.html' })
export class Authorization implements OnInit, AfterViewInit
{
	constructor( @Inject('IAuth') public authorizationService: IAuth )
	{}

	ngOnInit = ()=>
	{
		debugger;
		(window as any).googleLogin = this.googleLogin;
	}
	googleLogin(userInfo)
	{
		debugger;
		console.log(userInfo)
  	}
	ngAfterViewInit()
	{
		console.log( 'Authorization::ngAfterViewInit' );

		if( this.authorizationService.enabled() )
		{
			if( this.authorizationService.idToken )
				this.onSignIn( this.authorizationService.idToken );
			else
				this.renderSignin();
		}
	}

	renderSignin( recursive:number=0 )
	{
		try
		{
			gapi.signin2.render( 'my-signin2',
			{
				//'scope': 'profile email',
				width: 160,
				//'height': 50,
				//'longtitle': false,
				theme: 'dark',
				onsuccess: (param)=>{ console.log( 'Authorization::onsuccess' ); this.onSignIn(param.getAuthResponse().id_token);},//(param) => this.onSignIn(param)
				onfailure: (k)=>{ debugger;console.error( `could not render google login ${k.error}` );}
			} );
		}
		catch( e )
		{
			if( e instanceof ReferenceError )
			{
				if( recursive<5 )
					setTimeout( ()=>this.renderSignin(++recursive), 10 );
				else
					console.error( `could not render google login - '${e}'` );
			}
			else
				console.error( `could not render google login:  '${e}'` );
		}
	}
	onSignIn(token:string)
	{
		this.authorizationService.login( token );
	/*	let profile = googleUser.getBasicProfile();
		console.log( 'Token || ' + googleUser.getAuthResponse().id_token );
		console.log( 'ID: ' + profile.getId() );
		console.log( 'Name: ' + profile.getName() );
		console.log( 'Image URL: ' + profile.getImageUrl() );
		console.log( 'Email: ' + profile.getEmail() );
	*/
	};
}
@NgModule({ imports: [], exports: [Authorization], declarations: [Authorization], providers: [] })
export class AuthorizationModule
{}