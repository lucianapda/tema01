import { SelectModule } from 'ng2-select';
import { CommonModule } from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    Ng2BootstrapModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    Ng2BootstrapModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
