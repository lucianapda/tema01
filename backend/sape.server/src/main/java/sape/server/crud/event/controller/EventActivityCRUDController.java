package sape.server.crud.event.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.event.service.EventActivityCRUDService;
import sape.server.model.event.EventDTO;
import sape.server.model.event.EventEntity;
import sape.server.model.event.activity.EventActivityDTO;
import sape.server.model.event.activity.EventActivityEntity;

/**
 * Implementação de {@link AbstractCRUDController} para {@link EventDTO}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@RestController
@RequestMapping("/events/activities")
public class EventActivityCRUDController extends AbstractCRUDController<EventActivityDTO, EventActivityEntity> {

    private EventActivityCRUDService activityCRUDService;

    /**
     * Retorna o activityCRUDService - {@link StateCRUDService}
     * @return {@link StateCRUDService}
     */
    public EventActivityCRUDService getUserFunctionCRUDService() {
        if (activityCRUDService == null) {
			activityCRUDService = ManagerInstance.get(EventActivityCRUDService.class);
		}
        return activityCRUDService;
    }

    /**
     * Serviço de persistencia de {@link EventEntity}
     * @return {@link AbstractCRUDService} of {@link EventEntity}
     */
    @Override
    protected AbstractCRUDService<EventActivityEntity, EventActivityDTO> getService() {
        return getUserFunctionCRUDService();
    }
}