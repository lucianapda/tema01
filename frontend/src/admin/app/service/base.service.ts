import {HttpService} from "./http/http.service";
/**
 * Created by Guilherme on 10/04/2017.
 */

/**
 * Serviço base para todos os serviços que efetuam alguma comunicação com backend da aplicação.
 */
export abstract class BaseService {

  constructor(protected httpService: HttpService) {}
}
