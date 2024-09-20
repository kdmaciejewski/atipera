import {Component} from '@angular/core';
import {PeriodicElement} from "../../models/periodic-element.model";
import {DataService} from "../../services/data/data.service";
import {Observable} from "rxjs";

const COLUMNS_SCHEMA = [
  {
    key: "position",
    type: "number",
    label: "Position"
  },
  {
    key: "name",
    type: "text",
    label: "Name"
  },
  {
    key: "weight",
    type: "number",
    label: "Weight"
  },
  {
    key: "symbol",
    type: "text",
    label: "Symbol"
  }
]

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent {
  // columnsToDisplay: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
  dataSource$: Observable<PeriodicElement[]> = this.dataService.elements$;

  columnsToDisplay: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA;


  constructor(private dataService: DataService) {
  }

  updateElement(index: number, updatedElement: PeriodicElement) {
    this.dataService.updateElement(index, updatedElement);
  }

}
