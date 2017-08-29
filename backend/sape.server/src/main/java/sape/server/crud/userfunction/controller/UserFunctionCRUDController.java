package sape.server.crud.userfunction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.userfunction.service.UserFunctionCRUDService;
import sape.server.crud.userfunction.service.UserFunctionQueryService;
import sape.server.model.event.EventDTO;
import sape.server.model.event.EventEntity;

/**
 * Implementação de {@link AbstractCRUDController} para {@link SubscriptionActivityDTO}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@RestController
@RequestMapping("/userfunctions")
public class UserFunctionCRUDController extends AbstractCRUDController<EventDTO, EventEntity> {

    private UserFunctionCRUDService userFunctionCRUDService;
    private UserFunctionQueryService userFunctionQueryService;

    /**
     * Retorna o userFunctionCRUDService - {@link StateCRUDService}
     * @return {@link StateCRUDService}
     */
    public UserFunctionCRUDService getUserFunctionCRUDService() {
        if (userFunctionCRUDService == null) {
			userFunctionCRUDService = ManagerInstance.get(UserFunctionCRUDService.class);
		}
        return userFunctionCRUDService;
    }

    /**
	 * Retorna uma instancia de {@link StateQueryService}
	 * @return {@link StateQueryService}
	 */
	public UserFunctionQueryService getUserFunctionQueryService() {
		if (userFunctionQueryService == null) {
			userFunctionQueryService = ManagerInstance.get(UserFunctionQueryService.class);
		}
		return userFunctionQueryService;
	}

    /**
     * Serviço de persistencia de {@link SubscriptionActivityEntity}
     * @return {@link AbstractCRUDService} of {@link SubscriptionActivityEntity}
     */
    @Override
    protected AbstractCRUDService<EventEntity, EventDTO> getService() {
        return getUserFunctionCRUDService();
    }

    /**
     * Disponibiliza uma forma de leitura da entidade a partir do id.
     * @param id - {@link Long}
     * @return {@link ResponseEntity}
     */
	@GetMapping(params={"function"})
    public @ResponseBody ResponseEntity<?> read(@RequestParam(value = "function") String function){
        return ResponseEntity.ok(getService().convertAllToDTO(getUserFunctionQueryService().getFunctionsByName(function)));
    }
}