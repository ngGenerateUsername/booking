import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { SourceCode } from 'eslint';
import { CarsService } from '../services/cars.service';

import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../Models/cars';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class HomeComponent implements OnInit {
  model:any;

  //config autofill
  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();


  @ViewChild('instance', { static: true })
  instanceRetour!: NgbTypeahead;
  focus2$ = new Subject<string>();
  click2$ = new Subject<string>();
  locations:string[]=[];
  //end config autofill


  //config search begin
  searchForm = this.fb.group({
    priseVec:['',Validators.required],
    retourVec:['',Validators.required],
    dateDep:['',Validators.required],
    dateRet:['',Validators.required]
  })

  //end search config



  constructor(private carService:CarsService,private fb:FormBuilder,private storageService:LocalStorageService,
    private router:Router) { }
//au niveau de l'execution de se component on récupére tous les location(lieux) de chaque véhicule et on le met dans un tableau "location" pour l'autocomplete
  ngOnInit(): void {
    this.carService.getAll().subscribe(dataCars=>{
      dataCars.forEach(carLocation=> this.locations.push(carLocation.location));
    });
  }

  //autocomplete Begin
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.locations
        : this.locations.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  searchRetour: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click2$.pipe(filter(() => !this.instanceRetour.isPopupOpen()));
    const inputFocus$ = this.focus2$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.locations
        : this.locations.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  //end


  //search
  cherche()
  {
    if(this.searchForm.valid)
    {
      var priseVec=this.searchForm.get('priseVec')?.value;
      var retourVec=this.searchForm.get('retourVec')?.value;
      var dateDep=this.searchForm.get('dateDep')?.value;
      var dateRet=this.searchForm.get('dateRet')?.value;
      
      //store user data choice in the local storage (sooner i'll check every time i run this componenet if localStorage contain data if true i will fill the inputs of home page)
      this.storageService.storeData(retourVec,dateDep,dateRet);
      this.router.navigate(['search'],{queryParams:{priseVec:priseVec}});
    }else{
      // Toast sera affiché
    }
  }


}
