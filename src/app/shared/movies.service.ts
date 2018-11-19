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
    private moviesUrlById = 'http://www.omdbapi.com?apikey=ad3a0abc&i=';
    myMovies: Movie[] = [];

  constructor(private http: HttpClient) { }

    public getMovie(title: string): Observable<Movie> {
        return this.http.get<Movie>(this.moviesUrl + title)
    }

    public getMovieById(id: string): Observable<Movie> {
        return this.http.get<Movie>(this.moviesUrlById + id)
    }

    public getMyMovies():Array<Movie> {
        return this.myMovies;
    }

    public addMovie(title:string) {
        this.getMovie(title).subscribe((data:Movie) => {
            this.myMovies.push(data);
        });
    }

    public deleteMovie(movie: Movie) : void{
        this.myMovies = this.myMovies.filter(h => h !== movie);
    }

}
