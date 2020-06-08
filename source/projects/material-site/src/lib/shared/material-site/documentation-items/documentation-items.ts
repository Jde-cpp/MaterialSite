import {Injectable} from '@angular/core';

export interface DocItem {
  id: string;
  name: string;
  summary?: string;
  packageName?: string;
  examples?: string[];
}

export interface DocCategory {
  id: string;
  name: string;
  items: DocItem[];
  summary?: string;
}

export interface DocSection {
  name: string;
  summary: string;
}
const SettingsKey = 'settings';
const AIKey = "ai";

export const SECTIONS: {[key: string]: DocSection} =
{
	[SettingsKey]: { name: 'Settings', summary: 'Settings for the site.' },
	[AIKey]: { name: 'AI', summary: 'AI.' },
};


const DOCS: { [key: string]: DocCategory[] } =
{
	[SettingsKey]:
	[
		{id: 'applications',name: 'Applications',summary: 'View Applications.',items: []},
		{id: 'logs',name: 'Logs',summary: 'View logs.',items: []},
		{id: 'historian',name: 'Historian',summary: 'View historian.',items: []}
	],
	[AIKey]:
	[
		{id: 'matrix',	name: 'Matrix', summary: 'View Matrixes.',items: []},
		{id: 'features',name: 'Features',summary: 'View Features.', items: []},
		{id: 'calculation',name: 'Calculation',summary: 'View Calculations.',items: []}
	]
};

for( let category of DOCS[SettingsKey] )
{
	for( let doc of category.items )
		doc.packageName = SettingsKey;
}

const AllSettings = DOCS[SettingsKey].reduce( (result, settings) => result.concat(settings.items), [] );
const AllAI = DOCS[AIKey].reduce( (result, ai) => result.concat(ai.items), [] );
const ALL_CATEGORIES = DOCS[SettingsKey].concat( DOCS[AIKey] ); //.concat( DOCS[WindowsKey] )

@Injectable()
export class DocumentationItems
{
	getCategories(section: string): DocCategory[]
  	{
		return DOCS[section];
	}

	getItems(section: string): DocItem[]
	{
		if( section===SettingsKey )
			return AllSettings;
		return [];
	}

  getItemById(id: string, section: string): DocItem | undefined
  {
		//const sectionLookup = section === 'cdk' ? 'cdk' : 'material';
		//return ALL_DOCS.find(doc => doc.id === id && doc.packageName === sectionLookup);
		let item = null;
		if( !item )
			console.error( "item==null" );
		return item;
}

  getCategoryById(id: string): DocCategory | undefined
  {
		var item = ALL_CATEGORIES.find(c => c.id == id);
		if( !item )
			console.error( "item==null" );
		return item;
	}
}
