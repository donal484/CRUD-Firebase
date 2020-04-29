import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import {map, delay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class HeroesService {
  private url='https://crud-b6301.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe:HeroeModel){

    return this.http.post(`${this.url}/heroes.json`,heroe)
            .pipe(
              map((resp: any)=>{
                heroe.id = resp.name;
                return heroe;
              })
            )

  }

  actualizarHeroe(heroe:HeroeModel){

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp);
  }

  borrarHeroe(id:string){

    return this.http.delete(`${this.url}/heroes/${id}.json`);

  }


  getHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  getHeroes(){
   return this.http.get(`${this.url}/heroes.json`)
          .pipe(map(respuesta=> this.crearArreglo(respuesta)),
          delay(1500))
  }

  private crearArreglo(heroesObj:Object){

    const heroes: HeroeModel[]=[];

    if(heroesObj === null) {return[];}

    Object.keys(heroesObj).forEach(llave => {
      const heroe:HeroeModel=heroesObj[llave];
      heroe.id = llave;

      heroes.push(heroe);
    });

    return heroes;

  }
  
}
