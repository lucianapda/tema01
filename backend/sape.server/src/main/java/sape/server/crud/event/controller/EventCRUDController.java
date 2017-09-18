package sape.server.crud.event.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.event.service.EventCRUDService;
import sape.server.crud.event.service.EventQueryService;
import sape.server.model.event.EventDTO;
import sape.server.model.event.EventEntity;

/**
 * Implementação de {@link AbstractCRUDController} para {@link EventDTO}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@RestController
@RequestMapping("/events")
public class EventCRUDController extends AbstractCRUDController<EventDTO, EventEntity> {

    private EventCRUDService activityCRUDService;
    private EventQueryService activityQueryService;

    /**
     * Retorna o activityCRUDService - {@link StateCRUDService}
     * @return {@link StateCRUDService}
     */
    public EventCRUDService getUserFunctionCRUDService() {
        if (activityCRUDService == null) {
			activityCRUDService = ManagerInstance.get(EventCRUDService.class);
		}
        return activityCRUDService;
    }

    /**
	 * Retorna uma instancia de {@link StateQueryService}
	 * @return {@link StateQueryService}
	 */
	public EventQueryService getUserFunctionQueryService() {
		if (activityQueryService == null) {
			activityQueryService = ManagerInstance.get(EventQueryService.class);
		}
		return activityQueryService;
	}

    /**
     * Serviço de persistencia de {@link EventEntity}
     * @return {@link AbstractCRUDService} of {@link EventEntity}
     */
    @Override
    protected AbstractCRUDService<EventEntity, EventDTO> getService() {
        return getUserFunctionCRUDService();
    }
}