import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Program } from './user';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private http: HttpClient) {}

  popupformvisibility = new BehaviorSubject<boolean>(false);
  ProgramsData = new BehaviorSubject<Program[]>([]);
  isEditMode = new BehaviorSubject<boolean>(false);

  PostData: Program[] = [];

  programUrl = 'http://cmi-ofm.azurewebsites.net/api/Program';
  programUrl2 = 'http://cmi-ofm.azurewebsites.net/api/program';

  storeData: Program = {
    programName: '',
    programNumber: '',
    programBudget: 0,
    programDescription: '',
    programID: '',
    isActive: false,
    canDelete: false,
    isVirtual: false,
  };

  getProgram() {
    return this.http.get<{ programs: Program[] }>(this.programUrl).pipe(
      map((res) => {
        return res.programs;
      })
    );
  }

  chageStatus(programId: string, data: Program, isActive: boolean) {
    data.isActive = !isActive;
    return this.http.put(this.programUrl + `/${programId}/Activate`, data);
  }

  updateData(programId: string, updateData: Program) {
    const formObject = new FormData();
    Object.keys(updateData).forEach((key) =>
      formObject.append(key, (updateData as any)[key])
    );
    return this.http.put(this.programUrl2, formObject).pipe(
      map((res) => {
        if (res) {
          const value1 = this.ProgramsData.getValue();
          const value2: Program[] = [];
          value1.forEach((response) => {
            if (response.programID === updateData.programID) {
              value2.push(response);
            } else {
              value2.push(updateData);
            }
          });
          this.ProgramsData.next(value2);
        }
      })
    );
  }
  addProgram(programsData: Program) {
    const formObject = new FormData();
    Object.keys(programsData).forEach((key) =>
      formObject.append(key, (programsData as any)[key])
    );
    return this.http.post(this.programUrl2, formObject).pipe(
      map((res) => {
        if (res) {
          this.PostData.push(programsData);
          this.ProgramsData.next(this.PostData);
        }
        return res;
      })
    );
  }
}
