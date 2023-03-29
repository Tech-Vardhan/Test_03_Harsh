import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Program } from 'src/app/share/program.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  Api = environment.Api;
  Programurl = 'http://cmi-ofm.azurewebsites.net/api/Program';
  Programurl2 = 'http://cmi-ofm.azurewebsites.net/api/program';

  constructor(private http: HttpClient) {}
  getAllPrograms() {
    return this.http.get(this.Programurl).pipe(map((res: any) => res.programs));
  }

  addProgram(programData: Program) {
    const formObject = new FormData();

    // formObject.append('programName','value1')

    for (let key in programData) {
      formObject.append(key, (programData as any)[key]);
    }

    // Object.keys(programData).forEach((key) =>
    //   formObject.append(key, (programData as any)[key])
    // );

    return this.http.post(
      'http://cmi-ofm.azurewebsites.net/api/program',
      formObject
    );
  }
  updateData(editedData: Program) {
    //editedData.programID = programID;
    const formObject = new FormData();
    for (let key in editedData) {
      formObject.append(key, (editedData as any)[key]);
    }

    return this.http.put(this.Programurl2, formObject);
  }
  updateStatusToactivate(programData: Program) {
    const formObject = new FormData();
    formObject.append('programID', programData.programID);
    return this.http.put(
      this.Programurl + `/${programData.programID}/Activate`,
      formObject
    );
  }
  updateStatusTodeactivate(programData: Program) {
    return this.http.delete(
      `http://cmi-ofm.azurewebsites.net/api/Program/${programData.programID}`
    );
  }
}
