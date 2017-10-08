import { Http } from '@angular/http';
import { ServiceLocator } from './../locator/service.locator';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import { TokenDTO } from '../../model/token/token.dto';
/**
 * Created by Guilherme on 07/04/2017.
 */

const TOKEN: string = 'token';
const DATE_TOKEN: string = 'datetoken';

@Injectable()
export class TokenService {

  public get httpService() : HttpService {
    return ServiceLocator.get(HttpService);
  }

  /**
   * Atribui o token atual do usuario e a data.
   */
  public setToken(token: TokenDTO, date: Date) {
    localStorage.setItem(TOKEN, JSON.stringify(token));
    localStorage.setItem(DATE_TOKEN, JSON.stringify(date));
  }

  /**
   * Retorna o token to usuário
   */
  public resetToken() {
    localStorage.removeItem(DATE_TOKEN);
    localStorage.removeItem(TOKEN);
  }

  /**
   * Retorna o token to usuário
   */
  public isTokenValid(): Promise<boolean> {
      let tokenDTO: any = JSON.parse(localStorage.getItem(TOKEN));

      let value: any = !!tokenDTO? tokenDTO.token : null;
      if (!!value) {
        console.log("Valiando: "+value);
        return this.httpService.put('/auth', {data: new ValidToken(value)});
      }
      return new Promise(() => false);
  }

  /**
   * Retorna o token to usuário
   */
  public getToken(): TokenDTO {
    return JSON.parse(localStorage.getItem(TOKEN));
  }

  /**
   * Retorna a data que o token foi gerado.
   */
  public getDate(): Date {
    return JSON.parse(localStorage.getItem(DATE_TOKEN));
  }
}

 class ValidToken {
     private token: String;

     constructor(token: String) {
       this.token = token;
     }
  }
