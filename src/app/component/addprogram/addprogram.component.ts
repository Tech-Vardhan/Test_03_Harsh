import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProgramService } from 'src/app/sharing/program.service';
import { Program } from 'src/app/sharing/user';

@Component({
  selector: 'app-addprogram',
  templateUrl: './addprogram.component.html',
  styleUrls: ['./addprogram.component.css'],
})
export class AddprogramComponent {
  storeData: Program = {
    programID: '',
    programNumber: '',
    programName: '',
    programDescription: '',
    canDelete: false,
    isActive: false,
    programBudget: 0,
    isVirtual: false,
  };
  add: boolean = false;
  isEditMode = this.programService.isEditMode;

  constructor(private programService: ProgramService) {}

  @ViewChild('form') signupForm!: NgForm;
  programName = '';
  programNumber = '';
  programBudget = 0;
  programDescription = '';

  ngOnInit() {
    this.storeData = this.programService.storeData;
    
    console.log(this.programService.storeData);
}

  onSubmit(data: any) {
    this.programService.addProgram(data).subscribe((res) => {
      console.log(res);
      alert('Successfull Added');
      // window.location.reload()
    });
  }
  updateProgramData(programID: string, updateData: Program) {
    updateData.programID = programID;
    this.programService.updateData(programID, updateData).subscribe();
  }
  close() {
    this.programService.popupformvisibility.next(false);
  }
}
