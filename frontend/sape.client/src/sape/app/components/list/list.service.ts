import { ListColumn, ListAction } from './list.component';
import {BaseDTO} from '../../model/base/base.dto';

 export interface ListService<T extends BaseDTO> {

   /**
    * Retorna o dado especificado ou os dados do backend.
    */
    read(id?: Number) : Promise<Array<T>>;

    /**
    * Retorna as colunas que serão utilizadas
    */
    getColumns() : Array<ListColumn>;

    /**
    * Retorna as ações que serão utilizadas
    */
    getActions() : Array<ListAction>;
 }
