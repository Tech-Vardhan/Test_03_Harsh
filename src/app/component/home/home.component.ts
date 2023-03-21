import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProgramService } from 'src/app/sharing/program.service';
import { Program } from 'src/app/sharing/user';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private programService: ProgramService,
    private router: Router,
    public dialog: MatDialog,
    
  ) {}

  title = 'Test_3';
  ProgramData: Program[] = [];

  ngOnInit() {
    this.programService.getProgram().subscribe((response) => {
      this.ProgramData = response;
    });
  }

  editData(data: Program) {
    this.programService.storeData = data;

    this.router.navigate(['/add']);
  }

  changeStatus(programID: string, data: Program, isActive: boolean) {
    this.programService
      .chageStatus(programID, data, isActive)
      .subscribe((res) => {
        // console.log(res);
      });
  }
 
}
