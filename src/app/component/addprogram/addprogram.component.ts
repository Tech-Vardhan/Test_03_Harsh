import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgramService } from 'src/app/sharing/program.service';
import { Program } from 'src/app/sharing/user';

@Component({
  selector: 'app-addprogram',
  templateUrl: './addprogram.component.html',
  styleUrls: ['./addprogram.component.css'],
})
export class AddprogramComponent {
  storeData: Program = {
    programID:'',
    programNumber:'',
    programName:'',
    programDescription:'',
    canDelete:false,
    isActive:false,
    programBudget:0,
     
  };
  add: boolean = false;
  isEditMode = false;

  constructor(
    private programService: ProgramService // public dialogRef: MatDialogRef<AddprogramComponent>,
  ) // @Inject(MAT_DIALOG_DATA) public data: Program | undefined
  {
    // if (data) {
    //   this.storeData = data;
    //   this.isEditMode = true;
    // }
  }

  @ViewChild('form') signupForm!: NgForm;
  programName = '';
  programNumber = '';
  programBudget = 0;
  programDescription = '';

  ngOnInit() {
    this.storeData = this.programService.storeData;
    console.log(this.programService.storeData);
  }

  // onSubmit(data: any) {
  //   this.programService.postProgram(data).subscribe((res) => {
  //     console.log(res);
  //   });

  //   // console.log(this.signupForm);
  // }
  updateProgramData(programID: string, updateData: Program) {
    this.programService.updateData(programID, updateData).subscribe();
  }
}
