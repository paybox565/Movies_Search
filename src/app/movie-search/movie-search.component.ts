import { Component, OnInit } from '@angular/core';
import { FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import {debounceTime, switchMap, map, startWith} from 'rxjs/operators';
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
                if(movie.Title !== undefined){
                    this.options.push(
                        movie.Title
                    )
                }
            });
        }
    }

    onSubmit(){
        let movieTilte = this.myControl.value || null;
        if(movieTilte != null){
            this.movies.getMovie(movieTilte).subscribe((data:Movie) => {
                this.myMovie = data;
            });
        }
    }

    addMovie(title: string){
        let tilte = title || null;
        if(tilte != null){
            this.movies.addMovie(title);
        }
    }




}
