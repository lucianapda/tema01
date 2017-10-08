/**
 * Created by Guilherme on 03/04/2017.
 */

import { NgModule }      from '@angular/core';
import {NotFoundComponent} from "./not.found.component";
import {routing} from "./not.found.routing";
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports:       [ routing,
                   SharedModule ],
  declarations: [ NotFoundComponent ],
  exports:      [ NotFoundComponent ],
  bootstrap:    [ NotFoundComponent ]
})
export class NotFoundModule { }
