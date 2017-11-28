package sape.server.crud.subscription.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.event.repository.EventActivityCRUDRepository;
import sape.server.crud.person.repository.PersonCRUDRepository;
import sape.server.crud.subscription.repository.SubscriptionCRUDRepository;
import sape.server.model.subscription.SubscriptionDTO;
import sape.server.model.subscription.SubscriptionEntity;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Serviço de persistencia de {@link SubscriptionEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class SubscriptionCRUDService extends AbstractCRUDService<SubscriptionEntity, SubscriptionDTO> {

    @Autowired
    private SubscriptionCRUDRepository subscriptionCRUDRepository;
    @Autowired
    private PersonCRUDRepository personCRUDRepository;
    @Autowired
    private EventActivityCRUDRepository eventActivityCRUDRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<SubscriptionEntity> getCRUDRepository() {
        return subscriptionCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link SubscriptionDTO}
     * @param entity - {@link SubscriptionEntity}
     * @return {@link SubscriptionEntity}
     */
    @Override
    public SubscriptionEntity convertToEntity(SubscriptionDTO dto, SubscriptionEntity entity) {
    	entity.setId(dto.getId());
    	entity.setVersion(dto.getVersion());
    	entity.setCode(dto.getCode());
    	entity.setDate(dto.getDate());
    	Long idPerson = dto.getIdPerson();
    	if (idPerson != null) {
			entity.setPerson(personCRUDRepository.get(idPerson));
		}
    	dto.getActivities().forEach(idActivity -> {
			SubscriptionActivityEntity activity = null;
			if (idActivity != null) {
				Optional<SubscriptionActivityEntity> findFirst = entity.getActivities().stream().filter(activityEntity -> idActivity.equals(activityEntity.getActivity().getId())).findFirst();
				if (findFirst.isPresent()) {
					activity = findFirst.get();
				} else {
					activity = new SubscriptionActivityEntity();
					activity.setActivity(eventActivityCRUDRepository.get(idActivity));
				}

				activity.setCode(1L);
		    	activity.setDate(LocalDateTime.now());
		    	activity.setSubscription(entity);
		    	entity.getActivities().add(activity);
			}
		});
        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link SubscriptionDTO}
     * @param entity - {@link SubscriptionEntity}
     * @return {@link UserUserFunctionDTO}
     */
    @Override
    public SubscriptionDTO convertToDTO(SubscriptionEntity entity, SubscriptionDTO dto) {
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
    	dto.setCode(entity.getCode());
    	dto.setDate(entity.getDate());
    	dto.setIdPerson(entity.getPerson().getId());
    	dto.setNamePerson(entity.getPerson().getName());
    	entity.getActivities().forEach(t -> {
			dto.getActivities().add(t.getActivity().getId());
		});
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link SubscriptionEntity}
     */
    @Override
    public SubscriptionEntity createEmptyEntity() {
        return new SubscriptionEntity();
    }

    @Override
    public SubscriptionDTO createEmptyDTO() {
        return new SubscriptionDTO();
    }

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void internalValidate(SubscriptionEntity entity) {
	}
}