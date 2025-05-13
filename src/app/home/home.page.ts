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
import { FlattedJsonService } from './flatted-json.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonButton, IonButtons, IonHeader, IonContent, IonToolbar, IonMenu, IonMenuButton, IonTitle, MenuComponent, ViewerComponent, SubHeaderComponent],
})
export class HomePage {
  
  public currentElement!: CurrentElement | null;
  public hasDDBB: boolean = false;

  private fixedOffsetTop: string = '0px !important';
  private defaultOffsetTop: string = '112px';
  
  constructor(
    private readonly home: HomeService,
    private readonly flatted: FlattedJsonService,
  ) {
    this.home.currentElement.subscribe(res => this.currentElement = res);
    this.home.DDBB.subscribe(db => this.hasDDBB = !!db);
  }

  get offsetTop(): string {
    return !!this.currentElement ? this.fixedOffsetTop : this.defaultOffsetTop;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    file && this.flatted.importFromFile(file);
  }

  import(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';
    input.addEventListener('change', this.onFileSelected.bind(this));
    document.body.appendChild(input);
    input.click();
    input.remove();
  }

  export(): void {
    this.flatted.exportToFile();
  }
}
