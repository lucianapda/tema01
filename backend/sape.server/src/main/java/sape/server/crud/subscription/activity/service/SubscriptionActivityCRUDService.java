package sape.server.crud.subscription.activity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.crud.activity.repository.ActivityCRUDRepository;
import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.subscription.activity.repository.SubscriptionActivityCRUDRepository;
import sape.server.crud.subscription.repository.SubscriptionCRUDRepository;
import sape.server.model.subscription.activity.SubscriptionActivityDTO;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Serviço de persistencia de {@link SubscriptionActivityEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class SubscriptionActivityCRUDService extends AbstractCRUDService<SubscriptionActivityEntity, SubscriptionActivityDTO> {

    @Autowired
    private SubscriptionCRUDRepository subscriptionCRUDRepository;
    @Autowired
    private SubscriptionActivityCRUDRepository subscriptionActivityCRUDRepository;
    @Autowired
    private ActivityCRUDRepository activityCRUDRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<SubscriptionActivityEntity> getCRUDRepository() {
        return subscriptionActivityCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link SubscriptionActivityDTO}
     * @param entity - {@link SubscriptionActivityEntity}
     * @return {@link SubscriptionActivityEntity}
     */
    @Override
    public SubscriptionActivityEntity convertToEntity(SubscriptionActivityDTO dto, SubscriptionActivityEntity entity) {
    	entity.setId(dto.getId());
    	entity.setVersion(dto.getVersion());
    	entity.setCode(dto.getCode());
    	entity.setDate(dto.getDate());
    	entity.setWaitingList(dto.getWaitingList());
    	Long idActivity = dto.getIdActivity();
    	if (idActivity != null) {
			entity.setActivity(activityCRUDRepository.get(idActivity));
		}
    	Long idSubscription = dto.getIdSubscription();
    	if (idSubscription != null) {
			entity.setSubscription(subscriptionCRUDRepository.get(idActivity));
		}
        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link SubscriptionActivityDTO}
     * @param entity - {@link SubscriptionActivityEntity}
     * @return {@link UserUserFunctionDTO}
     */
    @Override
    public SubscriptionActivityDTO convertToDTO(SubscriptionActivityEntity entity, SubscriptionActivityDTO dto) {
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
    	dto.setCode(entity.getCode());
    	dto.setDate(entity.getDate());
    	dto.setWaitingList(entity.getWaitingList());
    	dto.setIdActivity(entity.getActivity().getId());
    	dto.setIdSubscription(entity.getSubscription().getId());
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link SubscriptionActivityEntity}
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