package sape.server.crud.event.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.event.repository.EventCRUDRepository;
import sape.server.crud.user.service.UserCRUDService;
import sape.server.model.entry.EntryDTO;
import sape.server.model.entry.EntryEntity;
import sape.server.model.event.EventDTO;
import sape.server.model.event.EventEntity;
import sape.server.model.event.activity.EventActivityDTO;
import sape.server.model.event.activity.EventActivityEntity;
import sape.server.model.user.UserEntity;

/**
 * Serviço de persistencia de {@link EntryEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class EventCRUDService extends AbstractCRUDService<EventEntity, EventDTO> {

    @Autowired
    private EventCRUDRepository eventCRUDRepository;

    @Autowired
    private UserCRUDService userCRUDService;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<EventEntity> getCRUDRepository() {
        return eventCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link EntryDTO}
     * @param entity - {@link EntryEntity}
     * @return {@link EntryEntity}
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
    	entity.setDateStartSubscription(dto.getDateStartSubscription());
    	entity.setDateEndSubscription(dto.getDateEndSubscription());
    	entity.setVacancy(dto.getVacancy());
    	entity.setWaitingList(dto.getWaitingList());
    	Long idUser = dto.getIdUser();
    	if (idUser != null) {
			entity.setUser(userCRUDService.getEntity(idUser));
		}
    	dto.getActivities().forEach(activityDTO -> {
			EventActivityEntity activity = null;
			if (activityDTO.getId() != null) {
				Optional<EventActivityEntity> findFirst = entity.getActivities().stream().filter(activityEntity -> activityDTO.getId().equals(activityEntity.getId())).findFirst();
				if (findFirst.isPresent()) {
					activity = findFirst.get();
				}

				activity.setId(activityDTO.getId());
				activity.setVersion(activityDTO.getVersion());
				activity.setCode(activityDTO.getCode());
				activity.setDescription(activityDTO.getDescription());
		    	activity.setSpeaker(activityDTO.getSpeaker());
		    	activity.setTheme(activityDTO.getTheme());
		    	activity.setDateStart(activityDTO.getDateStart());
		    	activity.setDateEnd(activityDTO.getDateEnd());
		    	activity.setVacancy(activityDTO.getVacancy());
		    	activity.setPlace(activityDTO.getPlace());
		    	activity.setEvent(entity);
			}
		});
        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link EntryDTO}
     * @param entity - {@link EntryEntity}
     * @return {@link EntryDTO}
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
    	dto.setDateStartSubscription(entity.getDateStartSubscription());
    	dto.setDateEndSubscription(entity.getDateEndSubscription());
    	dto.setVacancy(entity.getVacancy());
    	dto.setWaitingList(entity.getWaitingList());
    	UserEntity user = entity.getUser();
    	if (user != null) {
    		dto.setIdUser(user.getId());
		}
    	entity.getActivities().forEach(t -> {
			EventActivityDTO activityDTO = new EventActivityDTO();
			activityDTO.setId(t.getId());
			activityDTO.setVersion(t.getVersion());
			activityDTO.setCode(t.getCode());
			activityDTO.setDescription(t.getDescription());
			activityDTO.setSpeaker(t.getSpeaker());
			activityDTO.setTheme(t.getTheme());
			activityDTO.setDateStart(t.getDateStart());
			activityDTO.setDateEnd(t.getDateEnd());
			activityDTO.setVacancy(t.getVacancy());
			activityDTO.setPlace(t.getPlace());
			activityDTO.setIdEvent(t.getEvent().getId());
			dto.getActivities().add(activityDTO);
		});
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link EntryEntity}
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