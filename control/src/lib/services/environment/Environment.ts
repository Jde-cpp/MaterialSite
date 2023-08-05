import { Injectable } from '@angular/core';
import{ IEnvironment } from './IEnvironment'
import {environment} from '../../../../environments/environment'

@Injectable()
export class EnvironmentService implements IEnvironment
{
	get<T>( key:string ): T
	{
		return environment[key];
	}
}
