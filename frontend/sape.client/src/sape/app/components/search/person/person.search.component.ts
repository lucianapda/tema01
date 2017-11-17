import { PersonDTO } from './../../../model/person/person.dto';
import { ServiceLocator } from './../../../service/locator/service.locator';
import { ControlValueAccessor } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { PersonCrudService } from '../../../service/crud/person/person.crud.service';
 
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'person-search',
    template: `
        <sui-select
            class="selection"
            [optionsLookup]="optionsSearch"
            labelField="name"
            valueField="id"
            [(ngModel)]="selected"
            [isSearchable]="true"
            #searchSelect>
            <div class="ui icon search input">
                <i class="search icon"></i>
                <input suiSelectSearch type="text" placeholder="Pesquisa por nome...">
            </div>
            <div class="divider"></div>
            <div class="header">
                <i class="list icon"></i>
                Pessoas
            </div>
            <div class="scrolling menu">
                <sui-select-option *ngFor="let o of searchSelect.filteredOptions" [value]="o"></sui-select-option>
            </div>
        </sui-select>
    `,
    providers: [{
        provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PersonSearchComponent), multi: true
    }]
})
export class PersonSearchComponent implements ControlValueAccessor {

    private selected: Object;
    private propagateChange: Function = (person: PersonDTO) => { };

    private personCrudService() : PersonCrudService {
        return ServiceLocator.get(PersonCrudService);
    }
 
    private optionsSearch = (query: string) : Promise<PersonDTO[]> => {
        let params: Map<string, any> = new Map<string, any>();
        params.set('filters', '%name%='+ query); 
        return this.personCrudService().readByParams(params).then((values: Array<PersonDTO>) => {return values;});
    } 

    public setSelected(value?: PersonDTO | Object) {
        this.selected = value;
    }

    writeValue(person: PersonDTO | number) {
        if(!person) { return; }

        if (typeof person == 'number') {
            //  this.personCrudService().readById(person).then((values: Array<PersonDTO> | PersonDTO) => {
            //      if (values instanceof Array) {
            //          this.setSelected(values[0]); 
            //      } else if (values instanceof Object) {
            //          this.setSelected(values);
            //      } 
            //  });
            this.selected = 2;
        } else if (person instanceof PersonDTO) {
            this.setSelected(person);
        }
    }

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    } 
    
    registerOnTouched(fn: any) { }
}