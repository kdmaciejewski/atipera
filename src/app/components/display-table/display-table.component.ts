import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DataService} from '../../services/data/data.service';
import {PeriodicElement} from '../../models/periodic-element.model';
import {map, Observable} from 'rxjs';
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {FormControl} from "@angular/forms";

const COLUMNS_SCHEMA = [
  {key: "position", type: "number", label: "Position"},
  {key: "name", type: "text", label: "Name"},
  {key: "weight", type: "number", label: "Weight"},
  {key: "symbol", type: "text", label: "Symbol"}
];

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})

export class DisplayTableComponent implements OnInit {
  dataSource$: Observable<PeriodicElement[]> = this.dataService.elements$;
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA;
  filterControl = new FormControl('');

  constructor(private dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource$ = this.filterControl.valueChanges.pipe(
      startWith(''),
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap(filterValue => this.dataService.filterElements(filterValue ?? ''))
    );
  }

  openEditDialog(element: PeriodicElement, key: keyof PeriodicElement, index: number): void {
    const dialogRef = this.dialog.open<EditDialogComponent<any>, { value: any }>(EditDialogComponent, {
      width: '320px',
      data: {value: element[key]}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const updatedElement = {...element, [key]: result};
        this.dataService.updateElement(index, updatedElement);
      }
    })
  }

  updateElement(index: number, updatedElement: PeriodicElement) {
    this.dataService.updateElement(index, updatedElement);
  }
}
