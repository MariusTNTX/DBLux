import { Injectable } from '@angular/core';
import { CurrentElement, DataBase, Table } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public allowedTypes: string[] = ['boolean', 'number', 'string'];
  public DDBB!: DataBase;
  public currentElement: CurrentElement = {
    isArray: false,
    table: null,
    content: null
  };

  constructor() { 
    let nightwish: any = { name: 'Nightwish', followers: 475637458, albums: [], songs: [] };

    let century_child: any = { name: 'Century Child', type: 'Release', bands: [nightwish], songs: [] };
    let ever_dream: any = { name: 'Ever Dream', listeners: 7565754, album: century_child, bands: [nightwish] };
    let end_of_all_hope: any = { name: 'End of All Hope', listeners: 56578667, album: century_child, bands: [nightwish] };
    let phantom_of_the_opera: any = { name: 'Phantom of the Opera', listeners: 2342546, album: century_child, bands: [nightwish] };
    century_child.songs.push(ever_dream, end_of_all_hope, phantom_of_the_opera);

    let once: any = { name: 'Once', type: 'Release', bands: [nightwish], songs: [] };
    let nemo: any = { name: 'Nemo', listeners: 76845647887, album: once, bands: [nightwish] };
    let dark_chest_of_wonders: any = { name: 'Dark Chest of Wonders', listeners: 78867454, album: once, bands: [nightwish] };
    let wish_i_had_an_angel: any = { name: 'Wish I Had an Angel', listeners: 875423325, album: once, bands: [nightwish] };
    once.songs.push(nemo, dark_chest_of_wonders, wish_i_had_an_angel);
    
    let dark_passion_play: any = { name: 'Dark Passion Play', type: 'Release', bands: [nightwish], songs: [] };
    let amaranth: any = { name: 'Amaranth', listeners: 43534645567, album: dark_passion_play, bands: [nightwish] };
    let bye_bye_beautiful: any = { name: 'Bye Bye Beautiful', listeners: 5674343234, album: dark_passion_play, bands: [nightwish] };
    let eva: any = { name: 'Eva', listeners: 546980345, album: dark_passion_play, bands: [nightwish] };
    dark_passion_play.songs.push(amaranth, bye_bye_beautiful, eva);

    nightwish.albums.push(century_child, once, dark_passion_play);
    nightwish.songs.push(ever_dream, end_of_all_hope, phantom_of_the_opera, nemo, dark_chest_of_wonders, wish_i_had_an_angel, amaranth, bye_bye_beautiful, eva);

    this.DDBB = {
      name: 'MetaList',
      tables: [
        { tableName: 'Bands', elementName: 'Band', color: 'red', columns: [
          { name: 'Name', type: 'string', required: true, isHeader: true },
          { name: 'Followers', type: 'number' },
          { name: 'Albums', type: 'Album', isArray: true },
          { name: 'Songs', type: 'Song', isArray: true },
        ] },
        { tableName: 'Albums', elementName: 'Album', color: 'green', columns: [
          { name: 'Title', type: 'string', required: true, isHeader: true },
          { name: 'Type', type: 'string', required: true },
          { name: 'Bands', type: 'Band', isArray: true },
          { name: 'Songs', type: 'Song', isArray: true },
        ] },
        { tableName: 'Songs', elementName: 'Song', color: 'blue', columns: [
          { name: 'Title', type: 'string', required: true, isHeader: true },
          { name: 'Playcount', type: 'number' },
          { name: 'Album', type: 'Album', isObject: true },
          { name: 'Bands', type: 'Band', isArray: true },
        ] },
      ],
      rows: {
        bands: [nightwish],
        albums: [century_child, once, dark_passion_play],
        songs: [ever_dream, end_of_all_hope, phantom_of_the_opera, nemo, dark_chest_of_wonders, wish_i_had_an_angel, amaranth, bye_bye_beautiful, eva]
      }
    };
    console.log(this.DDBB);
  }

  get dbName(): string {
    return this.DDBB?.name;
  }

  get tables(): Table[] {
    return this.DDBB?.tables;
  }

  showTableRows(table: Table) {
    const content = this.DDBB.rows[table.tableName.toLowerCase()];
    const isArray = Array.isArray(content);
    if(this.currentElement){
      this.currentElement.content = content;
      this.currentElement.isArray = isArray;
      this.currentElement.table = table;
    } else this.currentElement = { content, isArray, table };
  }
}
