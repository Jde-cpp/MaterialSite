import {/*AsyncPipe,*/ Location} from '@angular/common';
import {Component, Inject, NgModule, OnDestroy, OnInit, Optional} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Params, Router, RouterModule, RouterLink, UrlSegment} from '@angular/router';
import {MatRipple} from '@angular/material/core';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {IRouteService, RouteService} from './IRouteService';

/*import {
  DocumentationItems,
  SECTIONS
} from '../../shared/documentation-items/documentation-items';*/
import {NavigationFocus} from '../../shared/navigation-focus/navigation-focus';

import {ComponentPageTitle} from '../page-title/page-title';
import {DocItem} from '../component-sidenav/component-sidenav'

@Component({
  selector: 'app-component-category-list',
  templateUrl: './component-category-list.html',
  styleUrls: ['./component-category-list.scss'],
  imports: [NavigationFocus, RouterLink, /*AsyncPipe,*/ MatRipple]
})
export class ComponentCategoryList implements OnInit/*, OnDestroy*/ {
  params: Observable<Params> | undefined;
  routeParamSubscription: Subscription = new Subscription();
  _categoryListSummary: string | undefined;
  items = new Array<DocItem>();
	section:string;
  constructor(/*public docItems: DocumentationItems,*/
    private router: Router,
    public _componentPageTitle: ComponentPageTitle,
    private route: ActivatedRoute,
    private _location:Location,
    @Optional() @Inject('IRouteService') private routeService:IRouteService){
    this.section = this._location.path();
    if( !this.routeService )
      this.routeService=new RouteService(router, route)
  }

  /*async*/ ngOnInit() {
		console.log( `ComponentCategoryList::ngOnInit start` );
    // Combine params from all of the path into a single object.
    this.params = combineLatest(
      this.route.pathFromRoot.map(route => route.params),
      Object.assign);
		if( this.route.parent.routeConfig ){//top menu items.
			for( let child of this.route.parent.routeConfig.children.filter((x)=>
					x.path.length && !x.path.endsWith("/:id") && !x.path.endsWith("/:target") ) ){
					if( child.path==":type" ){
						for( let type of child.data["types"] ){
							if( typeof type=='string' )
								this.items.push( <DocItem>{ id: type, name: type.charAt(0).toUpperCase()+type.slice(1) } );
							else{
								this.items.push( <DocItem>type );
							}
						}
					}
					else{
						let docItem = <DocItem>(child.data["pageSettings"] ?? {}); //
						docItem.id = child.path; //
						docItem.name = <string>child["title"]; //
						this.items.push( docItem ); //
					}
				}
			}else{//Home component.
				for( let config of this.router.config.filter( x=> x.data && x.path.length && x.path!="login" ) ){
					let pageSettings = config.data["pageSettings"];
					this.items.push( <DocItem>{ id: config.path, name: config.title, summary: pageSettings?.summary } );
				}
			}
			const section = { name: this.route.data["value"].name, summary: this.route.data["value"].summary }; //
			this._componentPageTitle.title = section.name; ////
			this._categoryListSummary = section.summary; //
			// title on topbar navigation
			this.routeParamSubscription = this.params.subscribe(params => {
				console.log( `ComponentCategoryList::params ${JSON.stringify(params)}` );
			//  const sectionName = params['section'];
			//  const section = SECTIONS[sectionName];
			//  this._componentPageTitle.title = section.name;
			//  this._categoryListSummary = section.summary;
		});
  }

  //ngOnDestroy() {
  //  if (this.routeParamSubscription) {
  //    this.routeParamSubscription.unsubscribe();
  //  }
  //}
}

@NgModule({
  imports: [MatCardModule, RouterModule, ComponentCategoryList],
  exports: [ComponentCategoryList],
})
export class ComponentCategoryListModule { }
