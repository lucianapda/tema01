package sape.server.crud.subscription.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.subscription.service.SubscriptionActivityCRUDService;
import sape.server.model.subscription.SubscriptionDTO;
import sape.server.model.subscription.SubscriptionEntity;
import sape.server.model.subscription.activity.SubscriptionActivityDTO;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Implementação de {@link AbstractCRUDController} para {@link SubscriptionDTO}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@RestController
@RequestMapping("/subscriptions/activities")
public class SubscriptionActivityCRUDController extends AbstractCRUDController<SubscriptionActivityDTO, SubscriptionActivityEntity> {

    private SubscriptionActivityCRUDService activityCRUDService;

    /**
     * Retorna o activityCRUDService - {@link StateCRUDService}
     * @return {@link StateCRUDService}
     */
    public SubscriptionActivityCRUDService getUserFunctionCRUDService() {
        if (activityCRUDService == null) {
			activityCRUDService = ManagerInstance.get(SubscriptionActivityCRUDService.class);
		}
        return activityCRUDService;
    }

    /**
     * Serviço de persistencia de {@link SubscriptionEntity}
     * @return {@link AbstractCRUDService} of {@link SubscriptionEntity}
     */
    @Override
    protected AbstractCRUDService<SubscriptionActivityEntity, SubscriptionActivityDTO> getService() {
        return getUserFunctionCRUDService();
    }
}