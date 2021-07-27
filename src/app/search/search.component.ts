import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../Models/cars';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  carsNeeded:Car[] = [];
  lieux:string="";
  constructor(private carService:CarsService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( param=>{
     var lieux = param.priseVec;
     this.lieux = lieux;
     this.carService.getByLocation(lieux).subscribe(data=>{this.carsNeeded = data});
  
    });
  }

  //test if it's the first image to put int it class active
  ifActive(i:number)
  {
    if(i==0)
    return 'u-active';
    return '';
  }

}
