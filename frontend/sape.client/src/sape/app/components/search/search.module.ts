import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { PersonSearchComponent } from './person/person.search.component';

@NgModule({
  declarations: [PersonSearchComponent],
  providers: [],
  exports: [PersonSearchComponent],
  imports: [SharedModule],
  bootstrap: []
})
export class SearchModule { }
