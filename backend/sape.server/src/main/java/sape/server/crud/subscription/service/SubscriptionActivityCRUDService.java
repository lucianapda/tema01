package sape.server.crud.subscription.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.subscription.repository.SubscriptionActivityCRUDRepository;
import sape.server.model.subscription.SubscriptionDTO;
import sape.server.model.subscription.SubscriptionEntity;
import sape.server.model.subscription.activity.SubscriptionActivityDTO;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Serviço de persistencia de {@link SubscriptionEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class SubscriptionActivityCRUDService extends AbstractCRUDService<SubscriptionActivityEntity, SubscriptionActivityDTO> {

    @Autowired
    private SubscriptionActivityCRUDRepository subscriptionActivityCRUDRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<SubscriptionActivityEntity> getCRUDRepository() {
        return subscriptionActivityCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link SubscriptionDTO}
     * @param entity - {@link SubscriptionEntity}
     * @return {@link SubscriptionEntity}
     */
    @Override
    public SubscriptionActivityEntity convertToEntity(SubscriptionActivityDTO dto, SubscriptionActivityEntity entity) {
        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link SubscriptionDTO}
     * @param entity - {@link SubscriptionEntity}
     * @return {@link UserUserFunctionDTO}
     */
    @Override
    public SubscriptionActivityDTO convertToDTO(SubscriptionActivityEntity entity, SubscriptionActivityDTO dto) {
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
    	dto.setCode(entity.getCode());
    	dto.setDate(entity.getDate());
    	dto.setIdSubscription(entity.getSubscription().getId());
    	dto.setNamePerson(entity.getSubscription().getPerson().getName());
    	dto.setIdActivity(entity.getActivity().getId());
    	dto.setDescActivity(entity.getActivity().getDescription());
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link SubscriptionEntity}
     */
    @Override
    public SubscriptionActivityEntity createEmptyEntity() {
        return new SubscriptionActivityEntity();
    }

    @Override
    public SubscriptionActivityDTO createEmptyDTO() {
        return new SubscriptionActivityDTO();
    }

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void internalValidate(SubscriptionActivityEntity entity) {
	}
}