import {Injectable} from '@angular/core';
import {RxState} from "@rx-angular/state";
import {Observable, of} from 'rxjs';
import {PeriodicElement} from "../../models/periodic-element.model";

@Injectable({
  providedIn: 'root'
})
export class DataService extends RxState<{ elements: PeriodicElement[] }> {

  constructor() {
    super();

    this.set({
      elements: [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      ]
    });
  }

  get elements$(): Observable<PeriodicElement[]> {
    return this.select('elements');
  }

  updateElement(index: number, newElement: PeriodicElement){
    this.set({
      elements: this.get().elements.map((element, i) =>
        i === index ? newElement : element
      )
    });
  }
}
