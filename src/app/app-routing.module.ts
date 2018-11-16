import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieSearchComponent} from "./movie-search/movie-search.component";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: MovieSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
