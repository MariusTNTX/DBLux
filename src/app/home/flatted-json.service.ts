// flatted-json.service.ts
import { Injectable } from '@angular/core';
import { parse, stringify } from 'flatted';
import { HomeService } from './home.service';

@Injectable({
  providedIn: 'root',
})
export class FlattedJsonService {
  constructor(private readonly home: HomeService) {}

  importFromFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const content = reader.result as string;
        const parsedContent = parse(content);
        this.home.setDDBB(parsedContent);
      } catch (error) {
        console.error('Error al importar JSON:', error);
      }
    };
    reader.readAsText(file);
  }

  exportToFile(): void {
    const current = this.home.getDDBB();
    if (!current) return;
    const json = stringify(current);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const datetime = new Date().toISOString().split('.')[0].replace(/:/g, '-');
    const dbName = current.name.replace(/ /g, '_').toLowerCase();
    a.download = `${datetime}_${dbName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
