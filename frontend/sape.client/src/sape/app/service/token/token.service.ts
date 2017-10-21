import { CheckTokenDTO } from './../../model/token/check.token.dto';
import { Http } from '@angular/http';
import { ServiceLocator } from './../locator/service.locator';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import { TokenDTO } from '../../model/token/token.dto';
/**
 * Created by Guilherme on 07/04/2017.
 */

const TOKEN: string = 'token';
const CHECK_TOKEN: string = 'check_token';

@Injectable()
export class TokenService {

  public get httpService() : HttpService {
    return ServiceLocator.get(HttpService);
  }

  /**
   * Atribui o token atual do usuario e a data.
   */
  public setToken(token: TokenDTO) {
    localStorage.setItem(TOKEN, JSON.stringify(token));
  }

  /**
   * Atribui o token checkado atual
   */
  public setCheckToken(token: CheckTokenDTO) {
    localStorage.setItem(CHECK_TOKEN, JSON.stringify(token));
  }

  /**
   * Retorna o token to usuário
   */
  public resetToken() {
    localStorage.removeItem(CHECK_TOKEN);
    localStorage.removeItem(TOKEN);
  }

  /**
   * Retorna o token to usuário
   */
  public getToken(): TokenDTO {
    return JSON.parse(localStorage.getItem(TOKEN));
  }

  /**
   * Retorna o token checkado
   */
  public getCheckToken(): CheckTokenDTO {
    return JSON.parse(localStorage.getItem(CHECK_TOKEN));
  }
}