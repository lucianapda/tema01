package sape.server.crud.event.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.event.repository.EventCRUDRepository;
import sape.server.model.event.EventDTO;
import sape.server.model.event.EventEntity;

/**
 * Serviço de persistencia de {@link EventEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class EventCRUDService extends AbstractCRUDService<EventEntity, EventDTO> {

    @Autowired
    private EventCRUDRepository activityCRUDRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<EventEntity> getCRUDRepository() {
        return activityCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link EventDTO}
     * @param entity - {@link EventEntity}
     * @return {@link EventEntity}
     */
    @Override
    public EventEntity convertToEntity(EventDTO dto, EventEntity entity) {
    	entity.setId(dto.getId());
    	entity.setVersion(dto.getVersion());
    	entity.setCode(dto.getCode());
    	entity.setPlace(dto.getPlace());
    	entity.setDescription(dto.getDescription());
    	entity.setDateStart(dto.getDateStart());
    	entity.setDateEnd(dto.getDateEnd());
    	entity.setDateStart(dto.getDateStartSubscription());
    	entity.setDateEnd(dto.getDateEndSubscription());
    	entity.setVacancy(dto.getVacancy());
    	entity.setWaitingList(dto.getWaitingList());
        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link EventDTO}
     * @param entity - {@link EventEntity}
     * @return {@link EventDTO}
     */
    @Override
    public EventDTO convertToDTO(EventEntity entity, EventDTO dto) {
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
    	dto.setCode(entity.getCode());
    	dto.setPlace(entity.getPlace());
    	dto.setDescription(entity.getDescription());
    	dto.setDateStart(entity.getDateStart());
    	dto.setDateEnd(entity.getDateEnd());
    	dto.setDateStart(entity.getDateStartSubscription());
    	dto.setDateEnd(entity.getDateEndSubscription());
    	dto.setVacancy(entity.getVacancy());
    	dto.setWaitingList(entity.getWaitingList());
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link EventEntity}
     */
    @Override
    public EventEntity createEmptyEntity() {
        return new EventEntity();
    }

    @Override
    public EventDTO createEmptyDTO() {
        return new EventDTO();
    }

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void internalValidate(EventEntity entity) {

	}
}