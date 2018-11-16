import { Component, OnInit } from '@angular/core';
import { FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;
    myMovie: Movie;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    onSubmit(){
        let movieTilte = this.myControl.value || null;
        if(movieTilte != null){
            this.movies.getMovie(movieTilte).subscribe((data:Movie) => {
                this.myMovie = data;
            });
        }

    }
}
