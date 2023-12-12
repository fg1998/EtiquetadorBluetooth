import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Produto } from '../interfaces/produto';
import { map } from 'rxjs';
import { Etiqueta } from '../interfaces/etiqueta';
import { Storage } from '@ionic/storage-angular';
import { SetupService } from './setup.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private storage: Storage) {

   }
  getAll() {

  var _p = [{
    'recno': 1,
    'nome': 'arroz',
    'dias': 10
    },
  {
    'recno' : 2,
    'nome': 'queijo',
    'dias': 20
  }]
  return _p
  }

}
