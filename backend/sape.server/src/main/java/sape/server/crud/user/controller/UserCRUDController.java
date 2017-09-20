package sape.server.crud.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.user.service.UserCRUDService;
import sape.server.crud.user.service.UserQueryService;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;
import sape.server.model.user.UserDTO;
import sape.server.model.user.UserEntity;

/**
 * Implementação de {@link AbstractCRUDController} para {@link UserCityDTO}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@RestController
@RequestMapping("/users")
public class UserCRUDController extends AbstractCRUDController<UserDTO, UserEntity> {

    private UserCRUDService userCRUDService;
    private UserQueryService userQueryService;

    /**
     * Retorna o userCRUDService - {@link StateCRUDService}
     * @return {@link StateCRUDService}
     */
    public UserCRUDService getUserCRUDService() {
        if (userCRUDService == null) {
			userCRUDService = ManagerInstance.get(UserCRUDService.class);
		}
        return userCRUDService;
    }

    /**
	 * Retorna uma instancia de {@link UserQueryService}
	 * @return {@link UserQueryService}
	 */
	public UserQueryService getUserQueryService() {
		if (userQueryService == null) {
			userQueryService = ManagerInstance.get(UserQueryService.class);
		}
		return userQueryService;
	}

    /**
     * Serviço de persistencia de {@link SubscriptionActivityEntity}
     * @return {@link AbstractCRUDService} of {@link SubscriptionActivityEntity}
     */
    @Override
    protected AbstractCRUDService<UserEntity, UserDTO> getService() {
        return getUserCRUDService();
    }

    /**
     * Disponibiliza uma forma de leitura do usuário a partir do username.
     * @param username - {@link String}
     * @return {@link ResponseEntity}
     */
    @GetMapping(params={"username"})
    public @ResponseBody ResponseEntity<?> read(@RequestParam("username") String username){
        return ResponseEntity.ok(getUserQueryService().getUserByUsername(username));
    }
}