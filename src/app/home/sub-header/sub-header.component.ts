import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonIcon, IonItem, IonList, IonPopover, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { arrowBack, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { CurrentElement } from '../home.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
  imports: [IonTitle, IonItem, IonList, CommonModule, IonIcon, IonButton, IonPopover, IonList, IonItem, IonButtons, IonContent, IonToolbar, IonTitle],
})
export class SubHeaderComponent {

  public currentElement!: CurrentElement | null;
    
  constructor(private readonly home: HomeService) {
    addIcons({ arrowBack, ellipsisHorizontal, ellipsisVertical });
    this.home.currentElement.subscribe(res => this.currentElement = res);
  }

}
