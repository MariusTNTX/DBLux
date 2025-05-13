import { Component, OnInit } from '@angular/core';
import { IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonChip, IonButton, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent } from "@ionic/angular/standalone";
import { CurrentElement, Table } from '../../home.model';
import { HomeService } from '../../home.service';
import { CommonModule } from '@angular/common';

export interface Property { 
  isHeader: boolean | undefined, 
  isObject: boolean, 
  isArray: boolean, 
  color?: string,
  contrast?: string,
  key: string, 
  value: any 
}

export interface Color { 
  rgb: string, 
  whiteContrast: boolean 
}

@Component({
  selector: 'app-list-viewer',
  templateUrl: './list-viewer.component.html',
  styleUrls: ['./list-viewer.component.scss'],
  imports: [IonChip, IonItem, IonLabel, IonCol, IonRow, IonGrid, CommonModule]
})
export class ListViewerComponent  implements OnInit {

  public currentElement!: CurrentElement | null;
  public propertyElements!: Property[][];

  constructor(private readonly home: HomeService) { }

  ngOnInit() {
    this.home.currentElement.subscribe(res => {
      this.currentElement = res;
      this.propertyElements = this.currentElement?.content?.map((element: any) => this.getProps(element)) || [];
      console.log(this.currentElement, this.propertyElements);
    });
  }

  getProps(element: any): Property[] {
    return Object.entries(element).map(([key, value]) => {
      let isHeader = this.currentElement?.table?.columns?.some(c => c.isHeader && c.name.toLowerCase() === key);
      let isArray = Array.isArray(value);
      let isObject = typeof(value) === 'object' && !Array.isArray(value);
      if(isObject || isArray){
        value = isObject ? this.getObjectHeader(value) : this.getArrayHeaders(value);
        let table = this.currentElement?.table?.columns?.find(c => c.name.toLowerCase() === key)?.type;
        if(table && typeof(table) !== 'string'){
          let color = table.color;
          let contrast = table.contrast;
          return { isHeader, isObject, isArray, color, contrast, key, value };
        }
      }

      return { isHeader, isObject, isArray, key, value };
    });
  }

  getObjectHeader(value: unknown): unknown {
    let anyValue = value as any;
    let index = this.currentElement?.table?.columns?.find(c => c.isHeader)?.name?.toLowerCase();
    return index ? anyValue[index] : value;
  }

  getArrayHeaders(value: unknown): unknown {
    let anyValues = value as any[];
    if(anyValues.length <= 3){
      let index = this.currentElement?.table?.columns?.find(c => c.isHeader)?.name?.toLowerCase();
      return index ? anyValues.map(v => v[index]) : value;
    }
    return [`x ${anyValues.length}`];
  }
}
