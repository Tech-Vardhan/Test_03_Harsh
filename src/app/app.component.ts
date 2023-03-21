import { Component } from '@angular/core';
import { EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ProgramService } from './sharing/program.service';
import { Program } from './sharing/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  

  constructor(private programService: ProgramService) {}

  
}
