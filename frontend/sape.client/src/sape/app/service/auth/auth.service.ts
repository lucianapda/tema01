import { SAPE_LOGIN, SAPE_PAGES } from './../../app.routing.mapping';
import { ServiceLocator } from './../locator/service.locator';
import { HttpConfigMethod } from './../http/http.config.method';
import { HttpHeaders } from './../http/http.headers';
/**
 * Created by Guilherme on 06/04/2017.
 */

import { Injectable } from '@angular/core';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {TokenService} from '../token/token.service';
import {BaseService} from '../base.service';
import {HttpService} from '../http/http.service';

import { AuthCredentials } from './auth.credentials';
import {Router} from '@angular/router';

@Injectable()
export class AuthService extends BaseService {

  constructor(private router: Router) {
    super();
  }

  private get tokenService() : TokenService {
    return ServiceLocator.get(TokenService);
  }

  /**
   * Efetua a autenticação no servidor, com os parametros recebidos.
   */
  login(username: string, password: string): Promise<Boolean> {
    var headers = new HttpHeaders();
    headers.set('authorization', 'Basic c2FwZUNsaWVudDpQQHNzdzByZA==');
    let config = new HttpConfigMethod(null,
                 new Map([["grant_type", "password"], ["username", username], ["password", password]]),
                 headers);
    return super.httpService().post('/oauth/token', config).then((data) => {
        console.log(data);
        if (data instanceof Object) {
          this.tokenService.setToken(data);
          this.router.navigate([SAPE_PAGES.routingFull]);
          return true;
        } else {
          this.tokenService.resetToken();
          this.router.navigate([SAPE_LOGIN.routingFull]);
          return false;
        }
      }
    );
  }

  isLoggedIn(): Promise<boolean> {
    let tokenDTO = this.tokenService.getToken();

    let value: any = tokenDTO? tokenDTO.access_token : null;
    if (!!value) {
      console.log("Valiando: "+value);
      var headers = new HttpHeaders();
      headers.set('authorization', 'Basic c2FwZUNsaWVudDpQQHNzdzByZA==');
      let config = new HttpConfigMethod(null, new Map([['token', value]]), headers);
      return super.httpService().get('/oauth/check_token', config).then((data) => {
          console.log(data);
          if (data instanceof Object) {
            this.tokenService.setCheckToken(data);
            return true;
          } else {
            this.tokenService.resetToken();
            this.router.navigate([SAPE_LOGIN.routingFull]);
            return false;
          }
        }
      );
    }
    return new Promise(() => false);
  }

  logout(): void {
    this.tokenService.resetToken();
    this.router.navigate(['sape/login']);
  }
}