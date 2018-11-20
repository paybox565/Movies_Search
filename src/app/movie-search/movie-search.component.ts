import { Component, OnInit } from '@angular/core';
import { FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import {debounceTime, switchMap, map, startWith, finalize } from 'rxjs/operators';
import {MoviesService} from "../shared/movies.service";
import {Movie} from "../shared/movie";

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {

  constructor(private movies:MoviesService) { }

    myControl: FormControl = new FormControl();
    options: string[] = [];
    filteredOptions: Observable<string[]>;
    myMovie: Movie;
    movieInList: boolean = false;

    ngOnInit() {
        this.myControl.valueChanges.subscribe((value:string) => {
            if(value !== undefined){
                this.getMoviesTitle(value);
            }
        });

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                debounceTime(300),
                map(value => this._filter(value))
            );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    private getMoviesTitle(title: string){
        let movieTilte = title || null;
        if(movieTilte !== null){
            this.movies.getMovie(movieTilte).subscribe(movie => {
                if(movie.Title !== undefined && !this.options.includes(movie.Title)){
                    this.options.push(
                        movie.Title
                    );
                }
            },
            err => console.error('Caught ' + err));
        }
    }

    onSubmit(){
        let movieTilte = this.myControl.value || null;
        if(movieTilte != null){
            this.movies.getMovie(movieTilte)
                .subscribe(
                    (data:Movie) => this.myMovie = data,
                    err => console.error('Caught ' + err),
                    () => this.checkMovieIn(this.myMovie)
                );
        }
        this.options = [];
    }

    checkMovieIn(movie: Movie){
        let match: boolean = false;
        let myListTitles = this.movies.myMovies;
        myListTitles.forEach(function(item) {
            if(item.imdbID === movie.imdbID){
                match = true
            }
        });

        this.movieInList = match;
    }

    addMovie(title: string){
        let tilte = title || null;
        if(tilte != null){
            this.movies.addMovie(title);
            this.movieInList = true;
        }
    }




}
