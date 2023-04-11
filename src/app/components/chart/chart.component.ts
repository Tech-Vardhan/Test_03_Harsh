import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { map, pluck } from 'rxjs';
import { ChartData, chartModel, KpiData } from 'src/app/share/chart.model';
import { DropDown, dropdown2 } from 'src/app/share/dropdown';
import { ProgramService } from 'src/app/share/program.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  constructor(private _programService: ProgramService) {}
  dropdownList: { name: string; id: string }[] = [];
  selectedItems: any[] = [];
  dropdownSettings!: IDropdownSettings;
  loadedData: { name: string; id: string }[] = [];
  chartData: ChartData[] = [];
  dropDownid: string = '';
  submittal: number[] = [];
  rfi: number[] = [];
  asi: number[] = [];
  pr: number[] = [];
  isChecked = false;

  allselectedId: any;

  ngOnInit() {
    this.loadDropDowndata();
    // this.dropdownList = this.loadedData;
    // console.log(this.dropdownList);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',

      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  chartLoad() {
    new Chart('myChart', {
      type: 'pie',
      data: {
        labels: ['Submittals', 'RFI', 'ASI', 'PR'],
        datasets: [
          {
            label: 'Submittals',
            data: this.submittal,
            borderWidth: 1,
          },
          {
            label: 'Rfi',
            data: this.rfi,
            borderWidth: 1,
          },
          {
            label: 'Asi',
            data: this.asi,
            borderWidth: 1,
          },
          {
            label: 'pr',
            data: this.pr,
            borderWidth: 1,
          },
        ],
      },

      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  loadDropDowndata() {
    // debugger;

    this._programService.DropDownData().subscribe((res) => {
      this.dropdownList = res.documentList;
    });
  }
  
  onItemSelect(item: any) {
    // debugger;
    if (this.dropdownList && this.dropdownList.length > 0) {
      this.dropdownList.filter((id) => {
        if (id.id === item.id) {
          this.selectedItems.push(id.id);
        }
        return this.selectedItems;
      });
      this.allselectedId = this.selectedItems.join(',');
    }
  }

  //   Working On Selectall
  // onSelectAll(items: ListItem[]) {
  //   for (let i in this.loadedData) {
  //     this.allselectedId.push(this.loadedData[i].id);
  //   }
  // }

  onSubmitChartLoad() {
    this._programService
      .kpiData(this.allselectedId)
      .pipe(
        map((res) => {
          return res.kpiData.chartData;
        })
      )
      .subscribe((res) => {
        // using id recived chartdatam(post Method)
        this.chartData = res;
        // console.log(this.chartData);
        for (let i = 0; i < this.chartData.length; i++) {
          this.rfi.push(this.chartData[i].rfi);
          this.asi.push(this.chartData[i].asi);
          this.submittal.push(this.chartData[i].submittal);
          this.pr.push(this.chartData[i].pr);
        }
        this.chartLoad();
      });
  }
  //Project Methode
  // this.dropdownList = res.documentList.map((key) => ({
  //   id: key['id'],
  //   name: key['name'],
  // }));

  // console.log(this.dropdownList);
  //  this.dropdownList=this.loadedData
  // Old Code
  // for (let i = 0; i < this.loadedData.length; i++) {
  //   this.dropdownList.push(this.loadedData[i].name);
  // }
  // for (let i = 0; i < this.loadedData.length - 1; i++) {
  //   this.dropDownid = this.dropDownid + this.loadedData[i].id + ',';
  // }

  // this.dropDownid += this.loadedData[this.loadedData.length - 1];

  // console.log(this.dropDownid);

  //  console.log(this.dropDownid);
  // var fundingSourceIds = formData.projectNames ? formData.projectNames.map(projectsIds => projectsIds['id']) : '';

  // Using reduce transform Array into Object
  // var obj = this.selectedItems.reduce(function (selectedID, cur, i) {
  //   selectedID[i] = cur;
  //   return selectedID;
  // }, {});

  // this.allselectedId = obj;
  // console.log('selected', this.allselectedId);
}
