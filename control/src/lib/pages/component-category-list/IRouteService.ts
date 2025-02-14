import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Routes } from "@angular/router";


export interface IRouteService
{
	children():Promise<Routes>;
}

@Injectable()
export class RouteService implements IRouteService{
	constructor( private _router:Router, private route: ActivatedRoute )
	{}
	children():Promise<Routes>{
		return Promise.resolve( this.route.parent.routeConfig
			? this.route.parent.routeConfig.children
			: [] );
	}
}
