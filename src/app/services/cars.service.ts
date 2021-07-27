import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from '../Models/cars';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http:HttpClient) { }

  //get all Cars data 
  getAll():Observable<Car[]>
  {
    return this.http.get<Car[]>('./assets/dataJson/cars.json');
  }

  //filter cars by location(lieux) pour l'utiliser a la recherche des véhicule 
  getByLocation(location:string):Observable<Car[]>
  {
     return this.http.get<Car[]>('./assets/dataJson/cars.json').pipe(
       map(items => items.filter(item => item.location.toLowerCase() == location ))
     );
  }
}
