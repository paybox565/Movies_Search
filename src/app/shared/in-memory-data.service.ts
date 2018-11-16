import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Movie} from "./movie";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

    createDb() {
        const movies = [
            {
              imdbID: 2342342,
              Title: 'Mr. Nice',
              Poster: '',
              Year: '',
              Plot: ''
            },
            {
              imdbID: 2545435,
              Title: 'Mr. Very',
              Poster: '',
              Year: '',
              Plot: ''
            }
        ];
        return {movies};
    }
}
