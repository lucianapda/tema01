import { URL_SERVER } from './../http/http.constants';
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

  constructor (path: string) {
    super();
    this.path = path;
  }

  /**
   * Retorna toos os dados do backend.
   */
  public read() : Promise<Array<T>> {
    return super.httpService().get(this.path).then((data) => this.extract(data));
  }

  /**
   * Retorna o dado especificado ou os dados do backend.
   */
  public readById(id: Number) : Promise<Array<T>> {
    return super.httpService().get(id? this.path + "/" + id : this.path).then((data) => this.extract(data));
  }

  /**
   * Retorna o dado especificado ou os dados do backend.
   */
  public readByParams(params: Map<string, any>) : Promise<Array<T>> {
    return super.httpService().get(this.path, {params: params}).then((data) => this.extract(data));
  }

  /**
   * Executa a criação do dado no backend.
   */
  public create(data: T) : Promise<T> {
    return super.httpService().post(this.path, {data: data}).then((data) => this.extract(data));
  }

   /**
   * Executa a criação do dado no backend.
   */
  // public createAll(data: T[]) : Promise<T[]> {
  //   return super.httpService().post(this.path, {data: data}).then((data) => this.extract(data));
  // }

  /**
   * Executa a atualização dos dados no backend.
   */
  public update(data: T) : Promise<T> {
    return super.httpService().put(this.path, {data: data}).then((data) => this.extract(data));
  }

  /**
   * Executa a atualização dos dados no backend.
   */
  // public updateAll(data: T[]) : Promise<T[]> {
  //   return super.httpService().put(this.path, {data: data}).then((data) => this.extract(data));
  // }

  /**
   * Executa a atualização dos dados no backend.
   */
  public deleteById(id: Number, config?:HttpConfigMethod) : Promise<T> {
    config = config? config : new HttpConfigMethod();
    config.params = config.params? config.params : new Map<string, any>();
    config.params.set("id", id);
    return super.httpService().delete(this.path, config).then((data) => this.extract(data));
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

  /**
   * Retorna o path do serviço.
   */
  public getPath() : string{
    return this.path;
  }

  /**
   * Retorna o path final do serviço.
   */
  public getFinalPath() : string{
    return URL_SERVER + this.getPath();;
  }
}
