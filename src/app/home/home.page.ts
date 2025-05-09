import { Component } from '@angular/core';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar, IonButton } from '@ionic/angular/standalone';
import { MenuComponent } from "./menu/menu.component";
import { ViewerComponent } from "./viewer/viewer.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonButtons, IonHeader, IonContent, IonToolbar, IonMenu, IonMenuButton, IonTitle, MenuComponent, ViewerComponent],
})
export class HomePage {
  constructor() {}

  import(){
    console.log('import');
  }

  export(){
    console.log('export');
  }
}
