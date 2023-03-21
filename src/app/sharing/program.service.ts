import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Program } from './user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private http: HttpClient) {}

  programUrl = 'http://cmi-ofm.azurewebsites.net/api/Program';

  storeData: Program = {
    programName: '',
    programNumber: '',
    programBudget: 0,
    programDescription: '',
    programID: '',
    isActive: false,
    canDelete:false,
  };

  getProgram() {
    return this.http.get<{ programs: Program[] }>(this.programUrl).pipe(
      map((res) => {
        return res.programs;
      })
    );
  }
  // postProgram(data: Program[]) {
  //   return this.http.post(this.programUrl, data);
  // }
  chageStatus(programId: string, data: Program, isActive: boolean) {
    data.isActive = !isActive;
    return this.http.put(this.programUrl + `/${programId}/Activate`, data);
  }
  updateData(programId: string, updateData: Program) {
    return this.http.put(this.programUrl + `/${programId}/Activate`, updateData);
  }
}
