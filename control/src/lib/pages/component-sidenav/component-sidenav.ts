import {
	Component,
	 Input,
	NgModule,
	NgZone,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation
 } from '@angular/core';
 import {MatIconModule} from '@angular/material/icon';
 import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
 import {Router, ActivatedRoute, Params, RouterModule, NavigationEnd} from '@angular/router';
 import {CommonModule} from '@angular/common';
 import {ComponentHeaderModule} from '../component-page-header/component-page-header';
 import {FooterModule} from '../../shared/footer/footer';
 import {combineLatest, Observable, Subject, Subscription} from 'rxjs';
 import {filter, map} from 'rxjs/operators';
 import {animate, state, style, transition, trigger} from '@angular/animations';
 import {CdkAccordionModule} from '@angular/cdk/accordion';
 import {BreakpointObserver} from '@angular/cdk/layout';
 import { ComponentCategoryListModule } from '../component-category-list/component-category-list';
 import {FormsModule} from '@angular/forms';
 import {HttpClientModule} from '@angular/common/http';
 import {SvgViewerModule} from '../../shared/svg-viewer/svg-viewer';
 import {MatDrawerToggleResult} from '@angular/material/sidenav/drawer';
 import {MatListModule} from '@angular/material/list';
 import {NavigationFocusModule} from '../../shared/navigation-focus/navigation-focus';
 import {NavigationFocusService} from '../../shared/navigation-focus/navigation-focus.service';


 // These constants are used by the ComponentSidenav for orchestrating the MatSidenav in a responsive
 // way. This includes hiding the sidenav, defaulting it to open, changing the mode from over to
 // side, determining the size of the top gap, and whether the sidenav is fixed in the viewport.
 // The values were determined through the combination of Material Design breakpoints and careful
 // testing of the application across a range of common device widths (360px+).
 // These breakpoint values need to stay in sync with the related Sass variables in
 // src/styles/_constants.scss.
 const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
 const SMALL_WIDTH_BREAKPOINT = 939;

 export interface DocItem
 {
	 id: string;
	 name: string;
	 summary?: string;
	 packageName?: string;
	 examples?: string[];
	 parentUrl?:boolean;
 }

 export interface ISiblings
 {
	 siblings: Subject<Map<string,string>>;
 }

 @Component({
	selector: 'app-component-sidenav',
	templateUrl: './component-sidenav.html',
	styleUrls: ['./component-sidenav.scss'],
	encapsulation: ViewEncapsulation.None,
 })
 export class ComponentSidenav implements OnInit, OnDestroy {
	@ViewChild(MatSidenav) sidenav: MatSidenav;
	params: Observable<Params>;
	isExtraScreenSmall: Observable<boolean>;
	isScreenSmall: Observable<boolean>;
	 siblings = new Subject<Map<string,string>>();
	 private siblingsSubscription: Subscription;


	private subscriptions = new Subscription();
	constructor(
					private _route: ActivatedRoute,
					private _navigationFocusService: NavigationFocusService,
					zone: NgZone,
					breakpoints: BreakpointObserver) {
	  this.isExtraScreenSmall =
			breakpoints.observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
				 .pipe(map(breakpoint => breakpoint.matches));
	  this.isScreenSmall = breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
	  .pipe(map(breakpoint => breakpoint.matches));
	}

	ngOnInit() {
	  // Combine params from all of the path into a single object.
	  this.params = combineLatest(
			this._route.pathFromRoot.map(route => route.params), Object.assign);
	  this.subscriptions.add(
		 this._navigationFocusService.navigationEndEvents.pipe(map(() => this.isScreenSmall))
		 .subscribe((shouldCloseSideNav) => {
			  if (shouldCloseSideNav && this.sidenav) {
				 this.sidenav.close();
			  }
			}
		 ));
	 }
	 public onRouterOutletActivate( event : any )
	 {
		 this.siblingsSubscription?.unsubscribe();
		 if( 'siblings' in event )
		 {
			 this.siblingsSubscription = event.siblings.subscribe( (x)=>
			 {
				 //~~~debugger;
				 this.siblings.next(x);
			 } );
		 }
		 else
			 this.siblings.next( null );
	 }

	ngOnDestroy() {
	  this.subscriptions.unsubscribe();
	}

	toggleSidenav(sidenav: MatSidenav): Promise<MatDrawerToggleResult> {
	  return sidenav.toggle();
	}
 }

 @Component({
	selector: 'app-component-nav',
	templateUrl: './component-nav.html',
	animations: [
	  trigger('bodyExpansion', [
		 state('collapsed', style({height: '0px', display: 'none'})),
		 state('expanded', style({height: '*', display: 'block'})),
		 transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
	  ]),
	],
 })
 export class ComponentNav implements OnInit, OnDestroy {
	 currentItemId: string;
	 items = new Array<DocItem>();
	 section:string;
	 parentUrl: string;
	 private siblingSubscription: Subscription;
	 @Input() siblingEvents: Observable<Map<string,string>>;

	 constructor( private router: Router, private _route: ActivatedRoute )
		{
		}
	 ngOnDestroy(){ this.siblingSubscription?.unsubscribe(); }
	 ngOnInit()
	 {
		 let self = this;
		 this.siblingSubscription = this.siblingEvents?.subscribe( this.loadSiblings )
		 //this.router.events.pipe( filter(e=>e instanceof NavigationEnd) ).subscribe( this.onNavigationEnd );
		 /*	(val) =>
		 {
			 if( val instanceof NavigationEnd )
				 debugger;
		 });*/
		 this.parentUrl = this.section = this._route.routeConfig.path;
		 //console.log( `ComponentNav::ngOnInit parentUrl=${this.parentUrl}` );
		 this.reload( `/${this.parentUrl}` );
	 };
	 loadSiblings = ( e:Map<string,string> )=>
	 {
		 if( !e )
			 this.reload( `/${this.parentUrl}` );
		 else
		 {
			 this.items.length = 0;
			 let parent = '';
			 for( const [target,name] of e )
			 {
				 var docItem = { id: parent+target, name: name, parentUrl: !parent.length };
				 this.items.push( docItem );
				 if( !parent )
					 parent = `${target}/`;
			 }
		 }
	 }
	 reload( url )
	 {
		 //~~~debugger;
		 let load = ( config )=>
		 {
			 this.items.length = 0;
			 for( let x of config.children.filter( (x)=>!x.path.endsWith(":id") ) )
			 {
				 var docItem = <DocItem>x.data ?? { id: "", name: x.path };
				 docItem.id = x.path;
				 if( x.path.length )
					 this.items.push( docItem );
			 }
		 }
		 if( this.isRoot(url) )
			 load( this._route.routeConfig );
	 }
	 isRoot( url:string )
	 {
		 return url==`/${this.parentUrl}` || url.substr( this.parentUrl.length+2 ).indexOf('/')!=-1;
	 }
/*	 onNavigationEnd =( val:NavigationEnd )=>
	 {
 //		if( !this.isRoot(val.url) )
 //			this.reload( val.url.substr(1) );
	 }*/
 }

 @NgModule({
	imports: [
	  MatSidenavModule,
	  MatListModule,
	  RouterModule,
	  CommonModule,
	  ComponentCategoryListModule,
	  ComponentHeaderModule,
	  FooterModule,
	  FormsModule,
	  HttpClientModule,
	  CdkAccordionModule,
	  MatIconModule,
	  MatSidenavModule,
	  SvgViewerModule,
	  NavigationFocusModule
	],
	exports: [ComponentSidenav],
	declarations: [ComponentSidenav, ComponentNav],
	providers: [],
 })
 export class ComponentSidenavModule {}
