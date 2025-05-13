import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { arrowBack, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { CurrentElement } from '../home.model';
import { HomeService } from '../home.service';
import { ListViewerComponent } from "./list-viewer/list-viewer.component";
import { ObjectViewerComponent } from "./object-viewer/object-viewer.component";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  imports: [CommonModule, ListViewerComponent, ObjectViewerComponent]
})
export class ViewerComponent  implements OnInit {

  public currentElement!: CurrentElement | null;

  constructor(private readonly home: HomeService) {
    addIcons({ arrowBack, ellipsisHorizontal, ellipsisVertical });
  }

  ngOnInit() {
    this.home.currentElement.subscribe(res => this.currentElement = res);
  }

}
