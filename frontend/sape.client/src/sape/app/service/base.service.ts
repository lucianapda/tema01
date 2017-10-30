import { ServiceLocator } from './locator/service.locator';
import {HttpService} from "./http/http.service";

/**
 * Serviço base para todos os serviços que efetuam alguma comunicação com backend da aplicação.
 */
export abstract class BaseService {

  httpService() : HttpService {
    return ServiceLocator.get(HttpService);
  }
}
