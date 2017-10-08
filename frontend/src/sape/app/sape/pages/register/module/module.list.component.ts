import {ListComponent} from '../../../../components/list/list.component';
import {ModuleDTO} from '../../../../model/module/module.dto';
import {ModuleCrudService} from '../../../../service/crud/module/module.crud.service';
import {ListService} from '../../../../components/list/list.service';
import { Component } from '@angular/core';

/**
 * Created by Guilherme on 03/04/2017.
 */
@Component({
  moduleId: module.id,
  selector: 'module-list',
  styleUrls: ['./module.list.component.css'],
  templateUrl: ListComponent.HTML_URL
})
export class ModuleListComponent extends ListComponent<ModuleDTO> {

  constructor(private moduleCrudService: ModuleCrudService) {
    super();
  }

  getListService(): ListService<ModuleDTO> {
    return this.moduleCrudService;
  }

  protected getColumns() : {} {
    return {
        code: {
          title: 'Código'
        },
        name: {
          title: 'Nome'
        },
        description: {
          title: 'Descrição'
        },
        prefix: {
          title: 'Prefixo'
        },
        basePackage: {
          title: 'Base package'
        } 
      };
  }
}