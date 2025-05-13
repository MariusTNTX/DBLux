import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar, 
  IonButton, 
  IonIcon, 
  IonPopover,
  IonList,
  IonItem
} from '@ionic/angular/standalone';
import { MenuComponent } from "./menu/menu.component";
import { ViewerComponent } from "./viewer/viewer.component";
import { HomeService } from './home.service';
import { addIcons } from 'ionicons';
import { arrowBack, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { CurrentElement } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonIcon, IonButton, IonPopover, IonList, IonItem, IonButtons, IonHeader, IonContent, IonToolbar, IonMenu, IonMenuButton, IonTitle, MenuComponent, ViewerComponent],
})
export class HomePage {
  
  public currentElement!: CurrentElement | null;
  
  constructor(private readonly home: HomeService) {
    addIcons({ arrowBack, ellipsisHorizontal, ellipsisVertical });
    this.home.currentElement.subscribe(res => this.currentElement = res);
  }

  import(){
    console.log('import');
  }

  export(){
    console.log('export');
  }
}
