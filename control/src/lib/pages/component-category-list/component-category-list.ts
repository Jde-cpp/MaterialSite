import {CommonModule, NgIf, NgFor, AsyncPipe} from '@angular/common';
import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Params, RouterModule, RouterLink} from '@angular/router';
import {combineLatest, Observable, Subscription} from 'rxjs';

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
  section:string = "settings";
  constructor(/*public docItems: DocumentationItems,*/
              public _componentPageTitle: ComponentPageTitle,
              private _route: ActivatedRoute) {}

  ngOnInit() {
		for( let x of this._route.parent.routeConfig.children )
		{
			var docItem = <DocItem>x.data ?? { id: "", name: x.path };
			docItem.id = x.path;
			if( x.path.length && !x.path.endsWith("/:id") )
				this.items.push( docItem );
		}
		const section = { name: 'Settings', summary: 'Settings for the site.' };
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
