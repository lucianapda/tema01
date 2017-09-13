package sape.server.crud.subscription.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sape.server.core.spring.context.ManagerInstance;
import sape.server.crud.base.controller.AbstractCRUDController;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.subscription.service.SubscriptionCRUDService;
import sape.server.crud.subscription.service.SubscriptionQueryService;
import sape.server.model.subscription.SubscriptionDTO;
import sape.server.model.subscription.SubscriptionEntity;

/**
 * Implementação de {@link AbstractCRUDController} para {@link SubscriptionDTO}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@RestController
@RequestMapping("/subscriptions")
public class SubscriptionCRUDController extends AbstractCRUDController<SubscriptionDTO, SubscriptionEntity> {

    private SubscriptionCRUDService activityCRUDService;
    private SubscriptionQueryService activityQueryService;

    /**
     * Retorna o activityCRUDService - {@link StateCRUDService}
     * @return {@link StateCRUDService}
     */
    public SubscriptionCRUDService getUserFunctionCRUDService() {
        if (activityCRUDService == null) {
			activityCRUDService = ManagerInstance.get(SubscriptionCRUDService.class);
		}
        return activityCRUDService;
    }

    /**
	 * Retorna uma instancia de {@link StateQueryService}
	 * @return {@link StateQueryService}
	 */
	public SubscriptionQueryService getUserFunctionQueryService() {
		if (activityQueryService == null) {
			activityQueryService = ManagerInstance.get(SubscriptionQueryService.class);
		}
		return activityQueryService;
	}

    /**
     * Serviço de persistencia de {@link SubscriptionEntity}
     * @return {@link AbstractCRUDService} of {@link SubscriptionEntity}
     */
    @Override
    protected AbstractCRUDService<SubscriptionEntity, SubscriptionDTO> getService() {
        return getUserFunctionCRUDService();
    }
}