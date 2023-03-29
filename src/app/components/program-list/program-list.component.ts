import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Program } from 'src/app/share/program.model';
import { ProgramService } from 'src/app/share/program.service';
import { CreateEditComponent } from '../create-edit/create-edit.component';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss'],
})
export class ProgramListComponent {
  programs: Program[] = [];

  @ViewChild('grid') grid: GridComponent | undefined;

  constructor(
    private _programService: ProgramService,
    private _dialog: MatDialog
  ) {
    this.FetchData();
  }
  ngOnInit() {}

  openDialog() {
    const dialogRef = this._dialog.open(CreateEditComponent);
    dialogRef.afterClosed().subscribe((result: object) => {
      console.log('The add dialog was closed');
      this._programService.getAllPrograms().subscribe((res) => {
        this.programs = res;
      });
    });
  }
  onEdit(program: Program) {
    const dialogRef = this._dialog.open(CreateEditComponent, {
      data: program,
    });

    dialogRef.afterClosed().subscribe((result: object) => {
      console.log('The dialog was closed');
      this._programService.getAllPrograms().subscribe((res) => {
        this.programs = res;
      });
    });
  }
  onStatusChange(data: Program) {
    if (data.isActive == false) {
      this._programService.updateStatusToactivate(data).subscribe((res) => {
        this.FetchData();
      });
    } else {
      console.log('deactive');

      this._programService.updateStatusTodeactivate(data).subscribe((res) => {
        this.FetchData();
      });
    }
  }
  FetchData() {
    this._programService.getAllPrograms().subscribe((res) => {
      // Normal Method
      this.programs = res;
      console.log();

      //   this.grid?.refresh();
      // this.grid?.setProperties({
      //   dataSource: res,
      // });
      // this.programs = res.programs;
    });
  }
}
