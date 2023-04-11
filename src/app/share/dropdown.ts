// export class DropDown {
//   description: any;
//   id: string | undefined;
//   name: string | undefined;
// }
// export class dropdown2 {
//   success: string | undefined;
//   message: string | undefined;
//   documentList: Array<DropDown> | undefined;
// }
export interface DropDown {
    description: any;
    id: string ;
    name: string;
  }
  export interface dropdown2 {
    success: string ;
    message: string ;
    documentList: DropDown[] ;
  }
  