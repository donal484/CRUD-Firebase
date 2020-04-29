import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe= new HeroeModel();
  constructor(public heroesService:HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if( id !== 'nuevo' ){

      this.heroesService.getHeroe(id)
      .subscribe((resp:HeroeModel)=>{
        this.heroe = resp;
        this.heroe.id=id;
      })
    }
  }

  guardar(form: NgForm){

    if(form.invalid){

      console.log('Formulario incompleto')
      return;
    } 

    Swal.fire({
      title:'Espere',
      text:'Guardando Informacion',
      allowOutsideClick:false,
      icon: 'info'

    })
    
    Swal.showLoading();

    let peticion: Observable <any>;

    if(this.heroe.id){
      peticion= this.heroesService.actualizarHeroe(this.heroe)
      } else{
      peticion= this.heroesService.crearHeroe(this.heroe)
    }

    peticion.subscribe(resp =>{

      Swal.fire({
        title:this.heroe.nombre,
        text: 'Se actualizo Correctamente',
        icon:'success'
      });

    });



    

  


  }

}

