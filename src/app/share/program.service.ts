import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Program } from 'src/app/share/program.model';
import { BehaviorSubject, map, Observable, pluck } from 'rxjs';
import { DropDown, dropdown2 } from './dropdown';
import { chartModel } from './chart.model';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  Api = environment.Api;

  isMode = new BehaviorSubject<boolean>(false)

  getListSubject = new BehaviorSubject<any>({});

  Programurl = 'http://cmi-ofm.azurewebsites.net/api/Program';
  Programurl2 = 'http://cmi-ofm.azurewebsites.net/api/program';
  dropdowdataUrl =
    'https://cmi-ofm.azurewebsites.net/api/File/GetCSI_Division_Code';
  chartUrl =
    'https://cmi-ofm.azurewebsites.net/api/KPI/GetCSIDivisionCodeWiseData';

  // headers={'Content-Type': 'application/json'};
  // // headers=new HttpHeaders();
  // options={headers:this.headers}

  constructor(private http: HttpClient) {}
  getAllPrograms() {
    // this.getListSubject.next(this.getAllPrograms)
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
  DropDownData() {
    return this.http.get<dropdown2>(this.dropdowdataUrl);
    // using map operator
  }
  kpiData(dropDownId: any) {
    return this.http.post<chartModel>(this.chartUrl, {
      csI_Division_Code: dropDownId,
    });
  }
}
