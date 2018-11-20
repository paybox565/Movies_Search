import { Component, OnInit } from '@angular/core';
import {Movie} from "../shared/movie";
import {MoviesService} from "../shared/movies.service";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  myMovies: Movie[] = [];

  constructor(private movies: MoviesService) { }

    ngOnInit() {
        this.getMovies();
    }

    getMovies(): Array<Movie> {
        return this.myMovies = this.movies.getMyMovies();
    }

    deleteMovie(item: Movie){
        let movie = item || null;
        if(movie != null){
            this.movies.deleteMovie(movie);
            this.myMovies = this.movies.getMyMovies();
        }
    }



}
