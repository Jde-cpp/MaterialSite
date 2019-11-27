import { NgModule } from '@angular/core';
//import {RouterModule} from '@angular/router';
//import {ComponentCategoryListModule} from './pages/component-category-list/component-category-list';
//import {ComponentSidenavModule} from './pages/component-sidenav/component-sidenav';
//import {ComponentHeaderModule} from './pages/component-page-header/component-page-header';
//import {FooterModule} from './shared/footer/footer';
import {ComponentListModule} from './pages/material-site/component-list';

import {ThemePickerModule} from './shared/theme-picker';
import {ComponentPageTitle} from './pages/material-site/page-title/page-title';
import {StyleManager} from './shared/style-manager';
import {CanActivateComponentSidenav} from './pages/material-site/component-sidenav/component-sidenav-can-load-guard';
import {ThemeStorage} from './shared/theme-picker/theme-storage/theme-storage';


@NgModule({
	//imports: [ComponentCategoryListModule,ComponentSidenavModule,ComponentHeaderModule,FooterModule,ComponentListModule, NavBarModule, ThemePickerModule],
	//imports:  
	imports: [],
	declarations: [],
	//providers:[ComponentPageTitle,CanActivateComponentSidenav,ThemeStorage,StyleManager]//,
	exports: []
	//exports: [ComponentCategoryListModule, FooterModule, ComponentListModule, NavBarModule, ThemePickerModule, ComponentSidenavModule,ComponentHeaderModule, ComponentPageTitle,CanActivateComponentSidenav,ThemeStorage,StyleManager]
})
export class MaterialSiteModule { }
