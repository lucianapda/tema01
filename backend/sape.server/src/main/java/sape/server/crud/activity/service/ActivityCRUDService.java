package sape.server.crud.activity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.crud.activity.repository.ActivityCRUDRepository;
import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.event.repository.EventCRUDRepository;
import sape.server.model.activity.ActivityDTO;
import sape.server.model.activity.ActivityEntity;
import sape.server.model.base.BaseDTO;

/**
 * Serviço de persistencia de {@link ActivityEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class ActivityCRUDService extends AbstractCRUDService<ActivityEntity, ActivityDTO> {

    @Autowired
    private ActivityCRUDRepository activityCRUDRepository;
    @Autowired
    private EventCRUDRepository eventCRUDRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<ActivityEntity> getCRUDRepository() {
        return activityCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link BaseDTO}
     * @param entity - {@link ActivityEntity}
     * @return {@link ActivityEntity}
     */
    @Override
    public ActivityEntity convertToEntity(ActivityDTO dto, ActivityEntity entity) {
    	entity.setId(dto.getId());
    	entity.setVersion(dto.getVersion());
    	entity.setCode(dto.getCode());
    	entity.setDescription(dto.getDescription());
    	entity.setSpeaker(dto.getSpeaker());
    	entity.setTheme(dto.getTheme());
    	entity.setDateStart(dto.getDateStart());
    	entity.setDateEnd(dto.getDateEnd());
    	entity.setVacancy(dto.getVacancy());
    	entity.setPlace(dto.getPlace());
    	Long idEvent = dto.getIdEvent();
    	if (idEvent != null) {
			entity.setEvent(eventCRUDRepository.get(idEvent));
		}
        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link BaseDTO}
     * @param entity - {@link ActivityEntity}
     * @return {@link UserUserFunctionDTO}
     */
    @Override
    public ActivityDTO convertToDTO(ActivityEntity entity, ActivityDTO dto) {
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
    	dto.setCode(entity.getCode());
    	dto.setDescription(entity.getDescription());
    	dto.setSpeaker(entity.getSpeaker());
    	dto.setTheme(entity.getTheme());
    	dto.setDateStart(entity.getDateStart());
    	dto.setDateEnd(entity.getDateEnd());
    	dto.setVacancy(entity.getVacancy());
    	dto.setPlace(entity.getPlace());
    	dto.setIdEvent(entity.getEvent().getId());
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link ActivityEntity}
     */
    @Override
    public ActivityEntity createEmptyEntity() {
        return new ActivityEntity();
    }

    @Override
    public ActivityDTO createEmptyDTO() {
        return new ActivityDTO();
    }

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void internalValidate(ActivityEntity entity) {

	}
}