import { Component } from '@angular/core';

import { ProgramService } from 'src/app/sharing/program.service';
import { Program } from 'src/app/sharing/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  visibility = this.programService.popupformvisibility;
  constructor(private programService: ProgramService) {}

  title = 'Test_3';
  ProgramData: Program[] = [];

  ngOnInit() {
    this.programService.getProgram().subscribe((response) => {
      this.ProgramData = response;
    });
  }

  editData(data: Program) {
    this.programService.storeData = data;
    this.programService.popupformvisibility.next(true);
    this.programService.isEditMode.next(true);
  }

  changeStatus(programID: string, data: Program, isActive: boolean) {
    const confirmed = confirm('Are you sure you want to update the status?');
    if (confirmed) {
      this.programService
        .chageStatus(programID, data, isActive)
        .subscribe((res) => {
          // console.log(res);
        });
    }
  }
  onaddProgram() {
    this.programService.popupformvisibility.next(true);
    this.programService.isEditMode.next(false);
  }
}
