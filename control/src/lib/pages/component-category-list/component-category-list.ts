import {CommonModule, Location, NgIf, NgFor, AsyncPipe} from '@angular/common';
import {Component, Inject, NgModule, OnDestroy, OnInit, Optional} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Params, RouterModule, RouterLink} from '@angular/router';
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
  standalone: true,
  imports: [NavigationFocus, NgIf, NgFor, RouterLink, AsyncPipe]
})
export class ComponentCategoryList implements OnInit, OnDestroy {
  //params: Observable<Params> | undefined;
  routeParamSubscription: Subscription;// = new Subscription();
  _categoryListSummary: string | undefined;
  items = new Array<DocItem>();
  section:string = this._location.path();
  constructor(/*public docItems: DocumentationItems,*/
              public _componentPageTitle: ComponentPageTitle,
              private _route: ActivatedRoute,
							private _location:Location,
							@Optional() @Inject('IRouteService') private _routeService:IRouteService){
		if( !this._routeService )
			this._routeService=new RouteService(_route)
	}

  async ngOnInit() {
		const children = await this._routeService.children();
		for( let x of children )
		{
			var docItem = <DocItem>x.data ?? { id: "", name: x.path };
			docItem.id = x.path;
			if( x.path.length && !x.path.endsWith("/:id") )
				this.items.push( docItem );
		}
		//const section = { name: 'Settings', summary: 'Settings for the site.' };
		const section = { name: this._route.data["value"].name, summary: this._route.data["value"].summary };
		this._componentPageTitle.title = section.name;
	this._categoryListSummary = section.summary;
		// title on topbar navigation
//    this.routeParamSubscription = this.params.subscribe(params => {
//      const sectionName = params['section'];
//      const section = SECTIONS[sectionName];
//      this._componentPageTitle.title = section.name;
//      this._categoryListSummary = section.summary;
//    });
  }

  ngOnDestroy() {
    //if (this.routeParamSubscription) {
//      this.routeParamSubscription.unsubscribe();
  //  }
  }
}

@NgModule({
  imports: [CommonModule, MatCardModule, RouterModule, ComponentCategoryList],
  exports: [ComponentCategoryList],
})
export class ComponentCategoryListModule { }
