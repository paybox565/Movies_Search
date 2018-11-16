import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap,} from 'rxjs/operators';
import {Movie} from "./movie";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private moviesUrl = 'http://www.omdbapi.com?apikey=ad3a0abc&t=';
  private moviesListUrl = 'http://www.omdbapi.com?apikey=ad3a0abc&t=';

  constructor(private http: HttpClient) { }

    public getMovie(title: string): Observable<Movie> {
        return this.http.get<Movie>(this.moviesUrl + title)
    }

    getMoviesList(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.moviesListUrl)
    }

}
