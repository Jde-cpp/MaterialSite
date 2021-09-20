import {Injectable} from '@angular/core';
/*import {EXAMPLE_COMPONENTS} from '@angular/components-examples';

export interface AdditionalApiDoc {
  name: string;
  path: string;
}

export interface ExampleSpecs {
  prefix: string;
  exclude?: string[];
}
*/
export interface DocItem {
  /** Id of the doc item. Used in the URL for linking to the doc. */
  id: string;
  /** Display name of the doc item. */
  name: string;
  /** Short summary of the doc item. */
  summary?: string;
  /** Package which contains the doc item. */
  packageName?: string;
  /** Specifications for which examples to be load. */
  //exampleSpecs: ExampleSpecs;
  /** List of examples. */
  examples?: string[];
  /** Optional id of the API document file. */
  //apiDocId?: string;
  /** Optional path to the overview file of this doc item. */
  //overviewPath?: string;
  /** List of additional API docs. */
  //additionalApiDocs?: AdditionalApiDoc[];
}

export interface DocSection {
  name: string;
  summary: string;
}
const SettingsKey = 'settings';
//const exampleNames = Object.keys(EXAMPLE_COMPONENTS);
//const CDK = 'cdk';
//const COMPONENTS = 'components';
export const SECTIONS: { [key: string]: DocSection } = {
	[SettingsKey]: { name: 'Settings', summary: 'Settings for the site.' },
	/*  [COMPONENTS]: {
    name: 'Components',
    summary: 'Angular Material offers a wide variety of UI components based on the <a' +
      ' href="https://material.io/components">Material Design specification</a>'
  },
  [CDK]: {
    name: 'CDK',
    summary: 'The Component Dev Kit (CDK) is a set of behavior primitives for building UI' +
      ' components.'
  },*/
};


const DOCS: { [key: string]: DocItem[] } = {
	[SettingsKey]:
	[
		{id: 'applications',name: 'Applications',summary: 'View Applications.'},
		{id: 'logs',name: 'Logs',summary: 'View logs.'},
		{id: 'historian',name: 'Historian',summary: 'View historian.'}
	],
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
export class DocumentationItems {

	getItems(section: string): DocItem[] {
	  if (section === SettingsKey) {
		 return AllSettings;
	  }
/*	  if (section === CDK) {
		 return ALL_CDK;
	  }*/
	  return [];
	}

	getItemById(id: string, section: string): DocItem | undefined {
		let item = null;
		if( !item )
			console.error( "item==null" );
		return item;
	}

}
