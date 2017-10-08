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

  constructor(protected httpService: HttpService, private tokenService: TokenService, private router: Router) {
    super(httpService);
  }

  /**
   * Efetua a autenticação no servidor, com os parametros recebidos.
   */
  login(username: string, password: string): Promise<Boolean> {
    return this.httpService.post('/oauth/token', {data : new AuthCredentials(username, password), params: new Map([["grantType", "password"], ["username", username], ["password", password], ["clientId", "sape_id"]])}).then((data) => {
        console.log(data);
        if (data instanceof Object) {
          this.tokenService.setToken(data, new Date());
          //this.router.navigate(['sape/pages']);
          return true;
        } else {
          this.tokenService.resetToken();
          //this.router.navigate(['sape/login']);
          return false;
        }
      }
    );
  }

  isLoggedIn(): Promise<boolean> {
    return this.tokenService.isTokenValid();
  }

  logout(): void {
    this.tokenService.resetToken();
    this.router.navigate(['sape/login']);
  }
}
