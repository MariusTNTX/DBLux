import { Component, OnInit } from '@angular/core';
import { IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { CurrentElement } from '../../home.model';
import { HomeService } from '../../home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-viewer',
  templateUrl: './list-viewer.component.html',
  styleUrls: ['./list-viewer.component.scss'],
  imports: [IonCol, IonRow, IonGrid, CommonModule, IonItem, IonLabel]
})
export class ListViewerComponent  implements OnInit {

  public currentElement!: CurrentElement;

  constructor(private readonly home: HomeService) { }

  ngOnInit() {
    this.currentElement = this.home.currentElement;
  }

  getProps(element: any): { key: string, value: unknown }[] {
    /* { name: 'Amaranth', listeners: 43534645567, album: dark_passion_play, bands: [nightwish] } */
    return Object.entries(element).map(([key, value]) => ({ key, value }));
  }
}
