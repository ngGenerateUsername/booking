import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  storeData(retour:string,dateDepart:string,retourDate:string)
  {
    this.clearData();
    localStorage.setItem("retour",retour);
    localStorage.setItem("dateDepart",dateDepart);
    localStorage.setItem("retourDate",retourDate);
  }

  clearData()
  {
    localStorage.removeItem("retour");
    localStorage.removeItem("dateDepart");
    localStorage.removeItem("retourDate");
    localStorage.clear();
  }
}
