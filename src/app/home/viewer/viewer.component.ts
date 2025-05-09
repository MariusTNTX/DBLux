import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { CurrentElement } from '../home.model';
import { HomeService } from '../home.service';
import { ListViewerComponent } from "./list-viewer/list-viewer.component";
import { ObjectViewerComponent } from "./object-viewer/object-viewer.component";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  imports: [IonToolbar, IonHeader, IonTitle, IonContent, CommonModule, ListViewerComponent, ObjectViewerComponent]
})
export class ViewerComponent  implements OnInit {

  public currentElement!: CurrentElement;

  constructor(private readonly home: HomeService) { }

  ngOnInit() {
    this.currentElement = this.home.currentElement;
  }

}
