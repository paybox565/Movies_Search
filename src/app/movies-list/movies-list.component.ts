import { Component, OnInit } from '@angular/core';
import {Movie} from "../shared/movie";
import {MoviesService} from "../shared/movies.service";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  movies: Movie[];

  constructor(private moviesService: MoviesService) { }

    ngOnInit() {
        this.getMovies();
    }

    getMovies(): void {
        this.moviesService.getMoviesList()
            .subscribe(movies => this.movies = movies);
    }

}
