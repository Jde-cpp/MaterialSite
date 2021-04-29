import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, RouterModule} from '@angular/router';
import {Observable, combineLatest, Subscription} from 'rxjs';
//import {DocumentationItems, SECTIONS} from 'src/app/shared/material-site/documentation-items/documentation-items';
import {ComponentPageTitle} from '../page-title/page-title';
import {SvgViewerModule} from '../../shared/svg-viewer/svg-viewer';
import {NavigationFocusModule} from '../../shared/navigation-focus/navigation-focus';
import {DocItem} from '../component-sidenav/component-sidenav'


@Component({
  selector: 'app-component-category-list',
  templateUrl: './component-category-list.html',
  styleUrls: ['./component-category-list.scss']
})
export class ComponentCategoryList implements OnInit, OnDestroy {
  //params: Observable<Params>;
  routeParamSubscription: Subscription;
  _categoryListSummary: string;
  items = new Array<DocItem>();

  constructor( /*public docItems: DocumentationItems,*/
              public _componentPageTitle: ComponentPageTitle,
				  private _route: ActivatedRoute)
	{}

  ngOnInit()
  {
		console.log( "ComponentCategoryList::ngOnInit" );
		//this._route.ch
		for( let x of this._route.parent.routeConfig.children )
		{
			var docItem = <DocItem>x.data ?? { id: "", name: x.path };
			docItem.id = x.path;
			if( x.path.length && !x.path.endsWith("/:id") )
				this.items.push( docItem );
		}
		const section = { name: 'Settings', summary: 'Settings for the site.' };//SECTIONS[sectionName];
      this._componentPageTitle.title = section.name;
      this._categoryListSummary = section.summary;
  }
  public onRouterOutletActivate(event : any)
  {
	  debugger;
	  console.log( event );
	 }
  	ngOnDestroy() {
   //  if (this.routeParamSubscription) {
   //    this.routeParamSubscription.unsubscribe();
   //  }
  	}
	section:string = "settings";
}

@NgModule({
  imports: [CommonModule, SvgViewerModule, MatCardModule, RouterModule, NavigationFocusModule],
  exports: [ComponentCategoryList],
  declarations: [ComponentCategoryList],
  providers: [],//DocumentationItems
})
export class ComponentCategoryListModule { }
