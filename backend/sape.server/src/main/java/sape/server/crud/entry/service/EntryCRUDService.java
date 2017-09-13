package sape.server.crud.entry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.entry.repository.EntryCRUDRepository;
import sape.server.crud.subscription.activity.repository.SubscriptionActivityCRUDRepository;
import sape.server.model.entry.EntryDTO;
import sape.server.model.entry.EntryEntity;

/**
 * Serviço de persistencia de {@link EntryEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class EntryCRUDService extends AbstractCRUDService<EntryEntity, EntryDTO> {

    @Autowired
    private EntryCRUDRepository entryCRUDRepository;
    @Autowired
    private SubscriptionActivityCRUDRepository subscriptionActivityCRUDRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<EntryEntity> getCRUDRepository() {
        return entryCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link EntryDTO}
     * @param entity - {@link EntryEntity}
     * @return {@link EntryEntity}
     */
    @Override
    public EntryEntity convertToEntity(EntryDTO dto, EntryEntity entity) {
    	entity.setId(dto.getId());
    	entity.setVersion(dto.getVersion());
    	entity.setCode(dto.getCode());
    	entity.setDateEntry(dto.getDateEntry());
    	entity.setDateDeparture(dto.getDateDeparture());
    	Long idSubscriptionActivity = dto.getIdSubscriptionActivity();
    	if (idSubscriptionActivity != null) {
			entity.setSubscriptionActivity(subscriptionActivityCRUDRepository.get(idSubscriptionActivity));
		}
        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link EntryDTO}
     * @param entity - {@link EntryEntity}
     * @return {@link UserUserFunctionDTO}
     */
    @Override
    public EntryDTO convertToDTO(EntryEntity entity, EntryDTO dto) {
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
    	dto.setCode(entity.getCode());
    	dto.setDateEntry(entity.getDateEntry());
    	dto.setDateDeparture(entity.getDateDeparture());
    	dto.setIdSubscriptionActivity(entity.getSubscriptionActivity().getId());
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link EntryEntity}
     */
    @Override
    public EntryEntity createEmptyEntity() {
        return new EntryEntity();
    }

    @Override
    public EntryDTO createEmptyDTO() {
        return new EntryDTO();
    }

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void internalValidate(EntryEntity entity) {
	}
}