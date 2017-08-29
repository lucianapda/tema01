package sape.server.crud.user.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.user.service.UserCRUDService;
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
     * Serviço de persistencia de {@link UserFunctionEntity}
     * @return {@link AbstractCRUDService} of {@link UserFunctionEntity}
     */
    @Override
    protected AbstractCRUDService<UserEntity, UserDTO> getService() {
        return getUserCRUDService();
    }
}