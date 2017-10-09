import {BaseDTO} from '../../model/base/base.dto';

 export interface ListService<T extends BaseDTO> {

   /**
    * Retorna o dado especificado ou os dados do backend.
    */
    read(id?: Number) : Promise<Array<T>>;
 }
