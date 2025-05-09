import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { add, addCircle, createOutline, trashOutline } from 'ionicons/icons';
import { HomeService } from '../home.service';
import { Table } from '../home.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonButtons, IonButton, IonIcon, CommonModule, IonList, IonListHeader, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class MenuComponent  implements OnInit {
  public dbName!: string;
  public tables!: Table[];

  constructor(private readonly home: HomeService) {
    addIcons({ addCircle, add, createOutline, trashOutline });
  }
  
  ngOnInit() {
    this.dbName = this.home.dbName ?? 'Menu';
    this.tables = this.home.tables;
  }

  trackItems(index: number, itemObject: Table) {
    return itemObject.tableName;
  }

  addDataBase(){
    console.log('addDataBase');
  }

  showTable(table: Table, event: any){
    if(event.srcElement?.localName !== 'ion-button'){
      console.log('showTable', table, event);
      this.home.showTableRows(table);
    }
  }

  addTable(){
    console.log('addTable');
  }

  editTable(table: Table, event: MouseEvent){
    event.preventDefault();
    console.log('editTable', table, event);
  }
  
  deleteTable(table: Table, event: MouseEvent){
    event.preventDefault();
    console.log('deleteTable', table, event);
  }
}
