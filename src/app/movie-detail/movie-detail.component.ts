import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {MoviesService} from "../shared/movies.service";
import {Movie} from "../shared/movie";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private movies: MoviesService,
      private location: Location
  ) { }

  movie: Movie;

  ngOnInit() {
      this.getMovie();
  }

  getMovie(): void {
      let id = this.route.snapshot.paramMap.get('id');
      this.movies.getMovieById(id)
          .subscribe(
              movie => this.movie = movie,
              err => console.error('Caught ' + err));
  }

  goBack(): void {
      this.location.back();
    }

}
