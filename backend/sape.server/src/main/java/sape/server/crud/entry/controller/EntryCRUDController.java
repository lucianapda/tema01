package sape.server.crud.entry.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.entry.service.EntryCRUDService;
import sape.server.crud.entry.service.EntryQueryService;
import sape.server.model.entry.EntryDTO;
import sape.server.model.entry.EntryEntity;

/**
 * Implementação de {@link AbstractCRUDController} para {@link EntryDTO}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@RestController
@RequestMapping("/entries")
public class EntryCRUDController extends AbstractCRUDController<EntryDTO, EntryEntity> {

    private EntryCRUDService activityCRUDService;
    private EntryQueryService activityQueryService;

    /**
     * Retorna o activityCRUDService - {@link StateCRUDService}
     * @return {@link StateCRUDService}
     */
    public EntryCRUDService getUserFunctionCRUDService() {
        if (activityCRUDService == null) {
			activityCRUDService = ManagerInstance.get(EntryCRUDService.class);
		}
        return activityCRUDService;
    }

    /**
	 * Retorna uma instancia de {@link StateQueryService}
	 * @return {@link StateQueryService}
	 */
	public EntryQueryService getUserFunctionQueryService() {
		if (activityQueryService == null) {
			activityQueryService = ManagerInstance.get(EntryQueryService.class);
		}
		return activityQueryService;
	}

    /**
     * Serviço de persistencia de {@link EntryEntity}
     * @return {@link AbstractCRUDService} of {@link EntryEntity}
     */
    @Override
    protected AbstractCRUDService<EntryEntity, EntryDTO> getService() {
        return getUserFunctionCRUDService();
    }
}