package sape.server.crud.subscription.activity.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.subscription.activity.service.SubscriptionActivityCRUDService;
import sape.server.crud.subscription.activity.service.SubscriptionActivityQueryService;
import sape.server.model.subscription.activity.SubscriptionActivityDTO;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Implementação de {@link AbstractCRUDController} para {@link SubscriptionActivityDTO}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@RestController
@RequestMapping("/subscriptions/activities")
public class SubscriptionActivityCRUDController extends AbstractCRUDController<SubscriptionActivityDTO, SubscriptionActivityEntity> {

    private SubscriptionActivityCRUDService activityCRUDService;
    private SubscriptionActivityQueryService activityQueryService;

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
	 * Retorna uma instancia de {@link StateQueryService}
	 * @return {@link StateQueryService}
	 */
	public SubscriptionActivityQueryService getUserFunctionQueryService() {
		if (activityQueryService == null) {
			activityQueryService = ManagerInstance.get(SubscriptionActivityQueryService.class);
		}
		return activityQueryService;
	}

    /**
     * Serviço de persistencia de {@link SubscriptionActivityEntity}
     * @return {@link AbstractCRUDService} of {@link SubscriptionActivityEntity}
     */
    @Override
    protected AbstractCRUDService<SubscriptionActivityEntity, SubscriptionActivityDTO> getService() {
        return getUserFunctionCRUDService();
    }
}