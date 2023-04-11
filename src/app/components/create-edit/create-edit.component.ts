import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Program } from 'src/app/share/program.model';
import { ProgramService } from 'src/app/share/program.service';
// import { ProgramListComponent } from '../program-list/program-list.component';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent {
  programForm: FormGroup;
  @Output()updateData = new EventEmitter<string>()
  isMode = false
  // @ViewChild('comp') child: ProgramListComponent | undefined;
  constructor(
    private form: FormBuilder,
    private programService: ProgramService,
    private _dialogRef: MatDialogRef<CreateEditComponent>,
    // private list: ProgramListComponent,
    @Inject(MAT_DIALOG_DATA) public programData: Program
  ) {
    this.programForm = this.form.group({
      programID: '',
      programNumber: '',
      programName: '',
      programDescription: '',
      isActive: true,
      programBudget: 0,
      isVirtual: false,
      canDelete: false,
    });
  }
  // If you use tdf form
  // @Input()
  // program: Program = {
  //   programID: '',
  //   programNumber: '',
  //   programName: '',
  //   programDescription: '',
  //   isActive: false,
  //   programBudget: 0,
  //   isVirtual: false,
  //   canDelete: false,
  // };

  ngOnInit() {
    this.programForm.patchValue(this.programData);
  }
  onSubmit() {
    if (this.programForm.valid) {
      if (!this.programData) {
        this.programService.addProgram(this.programForm.value).subscribe();
        this.programService.getListSubject.subscribe((res) => {
          console.log(res);
          console.log('subject called');  
          // this.updateData.emit()
        });
      } else {
        this.programService
          .updateData(this.programForm.value)
          .subscribe((res) => {
            // this.list.FetchData();
          });
      }
      this._dialogRef.close();

      //this.child?.FetchData();
    }
  }
  close() {
    this._dialogRef.close();
  }
}
