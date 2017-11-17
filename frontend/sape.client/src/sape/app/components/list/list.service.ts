import { HttpConfigMethod } from './../../service/http/http.config.method';
import { ListColumn, ListAction } from './list.component';
import {BaseDTO} from '../../model/base/base.dto';

/**
 * Interface que representa um serviço que é utilizado no componente de consulta.
 */
export interface ListService<T extends BaseDTO> {

  /**
    * Retorna o dado especificado ou os dados do backend.
    */
    read() : Promise<Array<T>>;

   /**
    * Retorna o dado especificado ou os dados do backend.
    */
    readById(id: Number) : Promise<Array<T>>;

    /**
    * Retorna o dado especificado ou os dados do backend.
    */
    readByParams(params: Map<string, any>) : Promise<Array<T>>;
 }
