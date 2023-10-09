import { Injectable } from '@angular/core';
import { ActivatedRoute, Routes } from "@angular/router";


export interface IRouteService
{
	children():Promise<Routes>;
}

@Injectable()
export class RouteService implements IRouteService{
	constructor( private _route: ActivatedRoute ){}
	children():Promise<Routes>{return Promise.resolve(this._route.parent.routeConfig.children);}
}
