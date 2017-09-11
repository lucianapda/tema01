package sape.server.crud.event.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.activity.service.ActivityCRUDService;
import sape.server.crud.activity.service.ActivityQueryService;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.model.activity.ActivityDTO;
import sape.server.model.activity.ActivityEntity;

/**
 * Implementação de {@link AbstractCRUDController} para {@link ActivityDTO}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@RestController
@RequestMapping("/userfunctions")
public class EventCRUDController extends AbstractCRUDController<ActivityDTO, ActivityEntity> {

    private ActivityCRUDService activityCRUDService;
    private ActivityQueryService activityQueryService;

    /**
     * Retorna o activityCRUDService - {@link StateCRUDService}
     * @return {@link StateCRUDService}
     */
    public ActivityCRUDService getUserFunctionCRUDService() {
        if (activityCRUDService == null) {
			activityCRUDService = ManagerInstance.get(ActivityCRUDService.class);
		}
        return activityCRUDService;
    }

    /**
	 * Retorna uma instancia de {@link StateQueryService}
	 * @return {@link StateQueryService}
	 */
	public ActivityQueryService getUserFunctionQueryService() {
		if (activityQueryService == null) {
			activityQueryService = ManagerInstance.get(ActivityQueryService.class);
		}
		return activityQueryService;
	}

    /**
     * Serviço de persistencia de {@link ActivityEntity}
     * @return {@link AbstractCRUDService} of {@link ActivityEntity}
     */
    @Override
    protected AbstractCRUDService<ActivityEntity, ActivityDTO> getService() {
        return getUserFunctionCRUDService();
    }
}