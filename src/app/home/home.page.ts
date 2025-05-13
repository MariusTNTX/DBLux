import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { CurrentElement } from './home.model';
import { HomeService } from './home.service';
import { MenuComponent } from "./menu/menu.component";
import { SubHeaderComponent } from "./sub-header/sub-header.component";
import { ViewerComponent } from "./viewer/viewer.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonButton, IonButtons, IonHeader, IonContent, IonToolbar, IonMenu, IonMenuButton, IonTitle, MenuComponent, ViewerComponent, SubHeaderComponent],
})
export class HomePage {
  
  public currentElement!: CurrentElement | null;
  public fixedOffsetTop: string = '0px !important';
  public defaultOffsetTop: string = '112px';
  
  constructor(private readonly home: HomeService) {
    this.home.currentElement.subscribe(res => this.currentElement = res);
  }

  get offsetTop(): string {
    return !!this.currentElement ? this.fixedOffsetTop : this.defaultOffsetTop;
  }

  import(){
    console.log('import');
  }

  export(){
    console.log('export');
  }
}
