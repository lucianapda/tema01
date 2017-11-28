package sape.server.crud.event.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.event.repository.EventActivityCRUDRepository;
import sape.server.model.entry.EntryDTO;
import sape.server.model.entry.EntryEntity;
import sape.server.model.event.activity.EventActivityDTO;
import sape.server.model.event.activity.EventActivityEntity;

/**
 * Serviço de persistencia de {@link EntryEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class EventActivityCRUDService extends AbstractCRUDService<EventActivityEntity, EventActivityDTO> {

    @Autowired
    private EventActivityCRUDRepository eventActivityCRUDRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<EventActivityEntity> getCRUDRepository() {
        return eventActivityCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link EntryDTO}
     * @param entity - {@link EntryEntity}
     * @return {@link EntryEntity}
     */
    @Override
    public EventActivityEntity convertToEntity(EventActivityDTO dto, EventActivityEntity entity) {
    	return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link EntryDTO}
     * @param entity - {@link EntryEntity}
     * @return {@link EntryDTO}
     */
    @Override
    public EventActivityDTO convertToDTO(EventActivityEntity entity, EventActivityDTO dto) {
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
    	dto.setCode(entity.getCode());
    	dto.setDateStart(entity.getDateStart());
    	dto.setDateEnd(entity.getDateEnd());
    	dto.setDescription(entity.getDescription());
    	dto.setIdEvent(entity.getEvent().getId());
    	dto.setPlace(entity.getPlace());
    	dto.setSpeaker(entity.getSpeaker());
    	dto.setTheme(entity.getTheme());
    	dto.setVacancy(entity.getVacancy());
    	return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link EntryEntity}
     */
    @Override
    public EventActivityEntity createEmptyEntity() {
        return new EventActivityEntity();
    }

    @Override
    public EventActivityDTO createEmptyDTO() {
        return new EventActivityDTO();
    }

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void internalValidate(EventActivityEntity entity) {

	}
}