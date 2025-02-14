import {
  Component,
  Input,
  NgModule,
  NgZone,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  forwardRef,
  input,
  viewChild
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AsyncPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http'; //
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {
  ActivatedRoute,
  Params,
  RouterModule,
  Routes,
  Router,
  RouterOutlet,
  RouterLinkActive,
  RouterLink,
  UrlSegment
} from '@angular/router';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {Subject} from 'rxjs';//
import {map} from 'rxjs/operators';

//import {DocViewerModule} from '../../shared/doc-viewer/doc-viewer-module';
import {
  DocumentationItems
} from '../../shared/documentation-items/documentation-items';
import {Footer} from '../../shared/footer/footer';

import {
  NavigationFocusService
} from '../../shared/navigation-focus/navigation-focus.service';

import {
  ComponentCategoryList,
  ComponentCategoryListModule
} from '../component-category-list/component-category-list';
import {ComponentPageHeader} from '../component-page-header/component-page-header';
/*
import {
  ComponentApi,
  ComponentExamples,
  ComponentOverview,
  ComponentViewer,
  ComponentViewerModule
} from '../component-viewer/component-viewer';
*/
//import {ComponentStyling} from '../component-viewer/component-styling';

// These constants are used by the ComponentSidenav for orchestrating the MatSidenav in a responsive
// way. This includes hiding the sidenav, defaulting it to open, changing the mode from over to
// side, determining the size of the top gap, and whether the sidenav is fixed in the viewport.
// The values were determined through the combination of Material Design breakpoints and careful
// testing of the application across a range of common device widths (360px+).
// These breakpoint values need to stay in sync with the related Sass variables in
// src/styles/_constants.scss.
const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;
export interface DocItem //
{
	id: string;
	name: string;
	summary?: string;
	packageName?: string;
	examples?: string[];
	parentUrl?:boolean;
}

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './component-sidenav.html',
  styleUrls: ['./component-sidenav.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatSidenavModule,
    forwardRef(() => ComponentNav),
    ComponentPageHeader,
    RouterOutlet,
    Footer,
    AsyncPipe,
  ],
})
export class ComponentSidenav implements OnInit, OnDestroy {
  readonly sidenav = viewChild(MatSidenav);
  params: Observable<Params> | undefined;
  isExtraScreenSmall: Observable<boolean>;
  isScreenSmall: Observable<boolean>;
  siblings = new Subject<Map<string,string>>(); //
  private siblingsSubscription: Subscription;  //
  private subscriptions = new Subscription();

  constructor(//public docItems: DocumentationItems,
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
          const sidenav = this.sidenav();
          if (shouldCloseSideNav && sidenav) {
            sidenav.close();
          }
        }
      ));
  }
  public onRouterOutletActivate( event : any ){//
	  this.siblingsSubscription?.unsubscribe();
	  if( 'siblings' in event ){
		  this.siblingsSubscription = event.siblings.subscribe( (x)=>{
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

  toggleSidenav(): void {
    this.sidenav()?.toggle();
  }
}

@Component({
  selector: 'app-component-nav',
  templateUrl: './component-nav.html',
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({ height: '0px', display: 'none' })),
      state('expanded', style({ height: '*', display: 'block' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
  imports: [
    MatListModule,
    RouterLinkActive,
    RouterLink,
   // AsyncPipe,
  ],
})
export class ComponentNav {
  readonly params = input<Observable<Params>>();
  currentItemId: string | undefined;
	items = new Array<DocItem>();//
	section:string;//
	parentUrl: string;//
	private siblingSubscription: Subscription;//
	@Input() siblingEvents: Observable<Map<string,string>>;//

 // constructor(public docItems: DocumentationItems) {}
  constructor(private router: Router, private route: ActivatedRoute ) {}
  subscribe( route: ActivatedRoute, who: string ){
    route.title.subscribe( (x)=>{
      console.log( `${who}.title: ${JSON.stringify(x)}` );
    });
    route.params.subscribe( (x)=>{
      console.log( `${who}.params: ${JSON.stringify(x)}` );
    });
    route.queryParams.subscribe( (x)=>{
      console.log( `${who}.queryParams: ${JSON.stringify(x)}` );
    });
    route.fragment.subscribe( (x)=>{
      console.log( `${who}.fragment: ${JSON.stringify(x)}` );
    });
    route.data.subscribe( (x)=>{
      console.log( `${who}.data: ${JSON.stringify(x)}` );
    });
    route.paramMap.subscribe( (x)=>{
      console.log( `${who}.paramMap: ${JSON.stringify(x)}` );
    });
    route.queryParamMap.subscribe( (x)=>{
      console.log( `${who}.queryParamMap: ${JSON.stringify(x)}` );
    });
    route.url.subscribe( (x)=>{
      console.log( `${who}.url: ${JSON.stringify(x)}` );
    });
  }

  ngOnDestroy(){ this.siblingSubscription?.unsubscribe(); }
  ngOnInit(){
    //this.subscribe( this.route, "this" );
    this.siblingSubscription = this.siblingEvents?.subscribe( this.loadSiblings );
    /*const children:Routes = this.route.routeConfig.children;
    for( const child of children ){
      if( child.path.endsWith(":id") )
        continue;
      const docItem:DocItem = <DocItem>{
        ...{name: child.title, id: child.path},
        ...child.data["pageSettings"]
      };
      console.log( `reload id=${docItem.id} name=${docItem.name} parentUrl=${docItem.parentUrl}` );
      if( child.path )
        this.items.push( docItem );
    }
    this.route.url.subscribe( (urls:UrlSegment[]) => {
      if( urls.length )
        this.parentUrl = urls[0].path;
    });*/
    this.parentUrl = this.section = this.route.routeConfig.path;
    this.reload( `/${this.parentUrl}` );
 };
 loadSiblings = ( e:Map<string,string> )=>{
   if( !e )
     this.reload( `/${this.parentUrl}` );
   else{
     this.items.length = 0;
     let parent = '';
     for( const [target,name] of e ){
       var docItem = { id: parent+target, name: name, parentUrl: !parent.length };
       console.log( `ComponentNav::loadSiblings id=${docItem.id} name=${docItem.name} parentUrl=${docItem.parentUrl}` );
       this.items.push( docItem );
       if( !parent )
         parent = `${target}/`;
     }
   }
 }

 reload( url ){
   //debugger;
   let load = ( config )=>{
     this.items.length = 0;
     for( let x of config.children.filter((x)=>!x.path.endsWith(":id") && !x.path.endsWith(":target")) ){
       //let docItem:DocItem = <DocItem>x.data ?? { id: "", name: x.path };
       const docItem:DocItem = <DocItem>{
        ...{name: x.title, id: x.path},
        ...x.data["pageSettings"] ?? {}
      };
      if( x.path.startsWith(':') ){
        var x2 = this.router.config;
        continue;
      }
      docItem.id = x.path;
      //console.log( `ComponentNav::reload id=${docItem.id} name=${docItem.name} parentUrl=${docItem.parentUrl}` );
      if( x.path.length )
        this.items.push( docItem );
     }
   }
   if( this.isRoot(url) )
     load( this.route.routeConfig );
 }

  isRoot( url:string ){
    return url==`/${this.parentUrl}` || url.substr( this.parentUrl.length+2 ).indexOf('/')!=-1;
  }
}

/*
const routes: Routes = [{
  path: '',
  component: ComponentSidenav,
  children: [
    {path: 'component/:id', redirectTo: ':id', pathMatch: 'full'},
    {path: 'category/:id', redirectTo: '/categories/:id', pathMatch: 'full'},
    {
      path: 'categories',
      children: [
        {path: '', component: ComponentCategoryList},
      ],
    },
    {
      path: ':id',
      component: ComponentViewer,
      children: [
        {path: '', redirectTo: 'overview', pathMatch: 'full'},
        {path: 'overview', component: ComponentOverview, pathMatch: 'full'},
        {path: 'api', component: ComponentApi, pathMatch: 'full'},
        {path: 'styling', component: ComponentStyling, pathMatch: 'full'},
        {path: 'examples', component: ComponentExamples, pathMatch: 'full'},
      ],
    },
    {path: '**', redirectTo: '/404'}
  ]
}];
*/

@NgModule({
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    ComponentCategoryListModule,
    //ComponentViewerModule,
    //DocViewerModule,
    FormsModule,
    CdkAccordionModule,
    MatIconModule,
    //RouterModule.forChild(routes),
    ComponentSidenav,
    ComponentNav
  ],
  exports: [ComponentSidenav],
})
export class ComponentSidenavModule {}
