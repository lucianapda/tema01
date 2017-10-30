import { HttpConfigMethod } from './../http/http.config.method';
import { Config } from './../../shared/config/env.config';
import { HttpHeaders } from './../http/http.headers';
import { ListColumn, ListAction } from './../../components/list/list.component';
import {BaseService} from "../base.service";
import {BaseDTO} from "../../model/base/base.dto";
import {ListService} from '../../components/list/list.service';
import {HttpService} from '../http/http.service';

/**
 * Created by Guilherme on 10/04/2017. 
 */
export abstract class BaseCrudService<T extends BaseDTO> extends BaseService implements ListService<T> {
  
  private path: string;

  public abstract getColumns(): Array<ListColumn>;
  public abstract getActions(): Array<ListAction>;

  constructor (path: string) {
    super();
    this.path = path;
  }

  /**
   * Retorna o dado especificado ou os dados do backend.
   */
  public read(id?: Number, config?:HttpConfigMethod) : Promise<Array<T>> {
    return super.httpService().get(id? this.path + "/" + id : this.path, config).then((data) => this.extract(data));
  }

  /**
   * Executa a criação do dado no backend.
   */
  public create(data: T) : Promise<T> {
    return super.httpService().post(this.path, {data: data}).then((data) => this.extract(data));
  }

  /**
   * Executa a atualização dos dados no backend.
   */
  public update(data: T) : Promise<T> {
    return super.httpService().put(this.path, {data: data}).then((data) => this.extract(data));
  }

  /**
   * Executa a atualização dos dados no backend.
   */
  public deleteById(id: Number) : Promise<T> {
    return super.httpService().delete(this.path + "/" + id).then((data) => this.extract(data));
  }

  /**
   * Extrador de dados.
   */
  private extract(data: any) {
    if (data instanceof Array){
      return data as Array<T>;
    } else if (data instanceof BaseDTO){
      return data as T;
    } else if (data instanceof Number) {
      return data as Number;
    } else {
      return data;
    }
  }
}
