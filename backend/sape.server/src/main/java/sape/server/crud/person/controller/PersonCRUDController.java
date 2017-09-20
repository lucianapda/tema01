package sape.server.crud.person.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.person.service.PersonCRUDService;
import sape.server.model.person.PersonDTO;
import sape.server.model.person.PersonEntity;

/**
 * Implementação de {@link AbstractCRUDController} para {@link PersonDTO}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@RestController
@RequestMapping("/people")
public class PersonCRUDController extends AbstractCRUDController<PersonDTO, PersonEntity> {

    private PersonCRUDService personCRUDService;

    /**
     * Retorna o personCRUDService - {@link StateCRUDService}
     * @return {@link StateCRUDService}
     */
    public PersonCRUDService getPersonCRUDService() {
        if (personCRUDService == null) {
			personCRUDService = ManagerInstance.get(PersonCRUDService.class);
		}
        return personCRUDService;
    }

    /**
     * Serviço de persistencia de {@link PersonEntity}
     * @return {@link AbstractCRUDService} of {@link PersonEntity}
     */
    @Override
    protected AbstractCRUDService<PersonEntity, PersonDTO> getService() {
        return getPersonCRUDService();
    }
}