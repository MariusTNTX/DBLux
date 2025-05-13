import { Injectable } from '@angular/core';
import { CurrentElement, DataBase, Table } from './home.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public allowedTypes: string[] = ['boolean', 'number', 'string'];
  public DDBB$: BehaviorSubject<DataBase | null> = new BehaviorSubject<DataBase | null>(null);
  public currentElement$: BehaviorSubject<CurrentElement | null> = new BehaviorSubject<CurrentElement | null>(null);

  constructor() { 
    let nightwish: any = { name: 'Nightwish', followers: 475637458, albums: [], songs: [] };

    let century_child: any = { name: 'Century Child', type: 'Release', bands: [nightwish], songs: [] };
    let ever_dream: any = { name: 'Ever Dream', playcount: 7565754, album: century_child, bands: [nightwish] };
    let end_of_all_hope: any = { name: 'End of All Hope', playcount: 56578667, album: century_child, bands: [nightwish] };
    let phantom_of_the_opera: any = { name: 'Phantom of the Opera', playcount: 2342546, album: century_child, bands: [nightwish] };
    century_child.songs.push(ever_dream, end_of_all_hope, phantom_of_the_opera);

    let once: any = { name: 'Once', type: 'Release', bands: [nightwish], songs: [] };
    let nemo: any = { name: 'Nemo', playcount: 76845647887, album: once, bands: [nightwish] };
    let dark_chest_of_wonders: any = { name: 'Dark Chest of Wonders', playcount: 78867454, album: once, bands: [nightwish] };
    let wish_i_had_an_angel: any = { name: 'Wish I Had an Angel', playcount: 875423325, album: once, bands: [nightwish] };
    once.songs.push(nemo, dark_chest_of_wonders, wish_i_had_an_angel);
    
    let dark_passion_play: any = { name: 'Dark Passion Play', type: 'Release', bands: [nightwish], songs: [] };
    let amaranth: any = { name: 'Amaranth', playcount: 43534645567, album: dark_passion_play, bands: [nightwish] };
    let bye_bye_beautiful: any = { name: 'Bye Bye Beautiful', playcount: 5674343234, album: dark_passion_play, bands: [nightwish] };
    let eva: any = { name: 'Eva', playcount: 546980345, album: dark_passion_play, bands: [nightwish] };
    dark_passion_play.songs.push(amaranth, bye_bye_beautiful, eva);

    nightwish.albums.push(century_child, once, dark_passion_play);
    nightwish.songs.push(ever_dream, end_of_all_hope, phantom_of_the_opera, nemo, dark_chest_of_wonders, wish_i_had_an_angel, amaranth, bye_bye_beautiful, eva);

    let band: Table = { tableName: 'Bands', elementName: 'Band', color: 'mediumvioletred', contrast: 'white', columns: [
      { name: 'Name', type: 'string', required: true, isHeader: true },
      { name: 'Followers', type: 'number' },
      { name: 'Albums', type: '', isArray: true },
      { name: 'Songs', type: '', isArray: true },
    ]};

    let album: Table = { tableName: 'Albums', elementName: 'Album', color: 'mediumspringgreen', contrast: 'black', columns: [
      { name: 'Name', type: 'string', required: true, isHeader: true },
      { name: 'Type', type: 'string', required: true },
      { name: 'Bands', type: '', isArray: true },
      { name: 'Songs', type: '', isArray: true },
    ]};

    let song: Table = { tableName: 'Songs', elementName: 'Song', color: 'royalblue', contrast: 'white', columns: [
      { name: 'Name', type: 'string', required: true, isHeader: true },
      { name: 'Playcount', type: 'number' },
      { name: 'Album', type: '', isObject: true },
      { name: 'Bands', type: '', isArray: true },
    ]};

    band.columns[2].type = album;
    band.columns[3].type = song;
    album.columns[2].type = band;
    album.columns[3].type = song;
    song.columns[2].type = album;
    song.columns[3].type = band;

    /* this.DDBB = {
      name: 'MetaList',
      tables: [ band, album, song ],
      rows: {
        bands: [nightwish],
        albums: [century_child, once, dark_passion_play],
        songs: [ever_dream, end_of_all_hope, phantom_of_the_opera, nemo, dark_chest_of_wonders, wish_i_had_an_angel, amaranth, bye_bye_beautiful, eva]
      }
    }; */
    console.log(this.DDBB$.value);
  }

  get DDBB(): Observable<DataBase | null> {
    return this.DDBB$.asObservable();
  }

  getDDBB(): DataBase | null {
    return this.DDBB$.value;
  }

  setDDBB(value: DataBase | null) {
    this.DDBB$.next(value);
  }

  get currentElement(): Observable<CurrentElement | null> {
    return this.currentElement$.asObservable();
  }

  get dbName(): string {
    return this.DDBB$.value?.name ?? '';
  }

  get tables(): Table[] {
    return this.DDBB$.value?.tables ?? [];
  }

  showTableRows(table: Table) {
    const content = this.DDBB$.value?.rows?.[table.tableName.toLowerCase()] ?? null;
    const isArray = Array.isArray(content);
    this.currentElement$.next({ content, isArray, table });
  }
}
