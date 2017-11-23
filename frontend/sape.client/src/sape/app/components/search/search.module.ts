import { EventActivitySearchComponent } from './event/activity/event-activity.search.component';
import { EventSearchComponent } from './event/event.search.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { PersonSearchComponent } from './person/person.search.component';

@NgModule({
  declarations: [PersonSearchComponent, EventSearchComponent, EventActivitySearchComponent],
  providers: [],
  exports: [PersonSearchComponent, EventSearchComponent, EventActivitySearchComponent],
  imports: [SharedModule],
  bootstrap: []
})
export class SearchModule { }
