import {Injectable} from '@angular/core';

export interface DocItem {
  id: string;
  name: string;
  summary?: string;
  packageName?: string;
  examples?: string[];
}

/*
export interface DocCategory {
  id: string;
  name: string;
  items: DocItem[];
  summary?: string;
}
*/
export interface DocSection {
  name: string;
  summary: string;
}

const SettingsKey = 'settings';
//const BlocklyKey = 'blocklyx';

export const SECTIONS: {[key: string]: DocSection} =
{
	[SettingsKey]: { name: 'Settings', summary: 'Settings for the site.' },
	//[BlocklyKey]: { name: 'Blocklyx', summary: 'Blockly Functions' },
};


const DOCS: { [key: string]: DocItem[] } =
{
	[SettingsKey]:
	[
		{id: 'applications',name: 'Applications',summary: 'View Applications.'},
		{id: 'logs',name: 'Logs',summary: 'View logs.'},
		{id: 'historian',name: 'Historian',summary: 'View historian.'}
	],
	/*[BlocklyKey]:
	[
		{
			id: 'autocomplete',
			name: 'Autocomplete',
			summary: 'Suggests relevant options as the user types.',
			//exampleSpecs: { prefix: 'autocomplete-', },
			//additionalApiDocs: [{name: 'Testing', path: 'material-autocomplete-testing.html'}],
		 },
		{id: 'tradeOption',	name: 'Option Trade', summary: 'Standard routing to buy and sell options.'},
		{id: 'tradeStock',name: 'Stock Trade', summary: 'Standard routing to buy and sell stocks.'},
	]*/
};

for( let doc of DOCS[SettingsKey] )
{
	doc.packageName = SettingsKey;
}
/*
for( let doc of DOCS[BlocklyKey] )
{
	doc.packageName = BlocklyKey;
}*/

const AllSettings = DOCS[SettingsKey];
//const AllBlockly = DOCS[BlocklyKey];
const ALL_DOCS = AllSettings;//.concat(AllBlockly);



@Injectable( {providedIn: 'root'} )
export class DocumentationItems
{
	getItems(section: string): DocItem[]
	{
		if( section===SettingsKey )
			return AllSettings;
/*		else if( section===BlocklyKey )
		{
			return AllBlockly;
		}*/
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
}
