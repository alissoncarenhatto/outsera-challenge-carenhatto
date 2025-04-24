import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieListComponent } from './movie-list.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }