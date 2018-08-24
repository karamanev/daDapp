import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortNews } from './sorting-pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SortNews],
  exports: [SortNews],
})
export class PipesModule {

  static forRoot() {
     return {
         ngModule: PipesModule,
         providers: [],
     };
  }
} 
