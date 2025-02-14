import {AfterViewInit, Component, NgModule, Inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { timeout } from 'rxjs/operators';
import { IAuth } from '../../services/authorization/IAuth';
import { IEnvironment } from '../../services/environment/IEnvironment';
//declare const google: any;//<script src="https://apis.google.com/js/platform.js" async defer></script>

@Component({ selector: 'authorization', templateUrl: './authorization.html', imports: [MatButtonModule,RouterLink,RouterLinkActive,]})
export class Authorization implements OnInit{
	constructor( @Inject('IEnvironment') private env: IEnvironment, @Inject('IAuth') private auth: IAuth )
	{}

	async ngOnInit(){
		this.auth.subscribe().subscribe({
			next:(login: string) =>{
				this.text = login;
			},
			error:(error: Error) =>{
				console.log( error.message );
				this.text = '';
			}});
		try{
			this.auth.validateSessionId();
		}
		catch( e ){
			console.trace( e );
		}
/*		const googleAuthClientId = await this.authorizationService.googleAuthClientId();
		if( this.googleCredential )
			this.handleCredentialResponse( {clientid: googleAuthClientId, client_id: googleAuthClientId, credential: this.googleCredential, select_by: "user" } );
		else if( google!==undefined ){
			google.accounts.id.initialize({
				client_id: googleAuthClientId,
				callback: this.handleCredentialResponse.bind(this),
				auto_select: false,
				cancel_on_tap_outside: true,
			});
			google.accounts.id.renderButton(
				// @t s-ignore
				document.getElementById("google-button"),
					{ theme: "outline", size: "large", width: "100%" }
				);
				// @t s-ignore
				google.accounts.id.prompt((notification: any/*PromptMomentNotification* /) => {});
		}*/
	}
	get text():string{ return this.#text ? this.#text : "Login"; } set text(x){ this.#text=x; } #text:string;
/*	async handleCredentialResponse(response: any){
		try{
			await this.authorizationService.login( response.credential );
			console.log( "logged in succesfully" );
		}
		catch( e ){
			console.error( e["message"] ?? e["error"] );
		}
	}
	googleLogin(userInfo){
		debugger;
		console.log(userInfo)
  	}

	ngAfterViewInit(){
		globalThis.window["handleCredentialResponse"] = async (response) =>{
			debugger;
		}
		console.log( 'Authorization::ngAfterViewInit' );

/*		if( this.authorizationService.enabled )
		{
			if( this.authorizationService.idToken )
				this.onSignIn( this.authorizationService.idToken );
			else
				this.renderSignin();
		}
* /
	}* /

	renderSignin( recursive:number=0 ){
		try{
			debugger;
/*			google.accounts.id.initialize({
				client_id: this.googleLoginClientId,
				callback: this.onSignIn
			});
			google.accounts.id.renderButton(
				document.getElementById("my-signin"),
				{ theme: "outline", size: "large" }  // customization attributes
			);
			google.accounts.id.prompt(); // also display the One Tap dialog
* /
			// gapi.signin2.render( 'my-signin2',
			// {
			// 	//'scope': 'profile email',
			// 	width: 160,
			// 	//'height': 50,
			// 	//'longtitle': false,
			// 	theme: 'dark',
			// 	onsuccess: (param)=>{ debugger;console.log( 'Authorization::onsuccess' ); this.onSignIn(param.getAuthResponse().id_token);},//(param) => this.onSignIn(param)
			// 	onfailure: (k)=>{ debugger;console.error( `could not render google login ${k.error}` );}
			// } );
		}
		catch( e ){
			debugger;
			if( e instanceof ReferenceError ){
				if( recursive<5 )
					setTimeout( ()=>this.renderSignin(++recursive), 10 );
				else
					console.error( `could not render google login - '${e}'` );
			}
			else
				console.error( `could not render google login:  '${e}'` );
		}
	}
	onSignIn(token:string){
		debugger;
		//this.authorizationService.login( token );
	/*	let profile = googleUser.getBasicProfile();
		console.log( 'Token || ' + googleUser.getAuthResponse().id_token );
		console.log( 'ID: ' + profile.getId() );
		console.log( 'Name: ' + profile.getName() );
		console.log( 'Image URL: ' + profile.getImageUrl() );
		console.log( 'Email: ' + profile.getEmail() );
	* /
	};
	private get googleCredential(){return this.env.get("googleCredential"); }*/
}
