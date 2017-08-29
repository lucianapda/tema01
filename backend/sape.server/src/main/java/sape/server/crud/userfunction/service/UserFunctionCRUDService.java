package sape.server.crud.userfunction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.userfunction.repository.UserFunctionCRUDRepository;
import sape.server.model.base.BaseDTO;
import sape.server.model.event.EventDTO;
import sape.server.model.event.EventEntity;

/**
 * Serviço de persistencia de {@link SubscriptionActivityEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class UserFunctionCRUDService extends AbstractCRUDService<EventEntity, EventDTO> {

    @Autowired
    private UserFunctionCRUDRepository userFunctionCRUDRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<EventEntity> getCRUDRepository() {
        return userFunctionCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link BaseDTO}
     * @param entity - {@link SubscriptionActivityEntity}
     * @return {@link SubscriptionActivityEntity}
     */
    @Override
    public EventEntity convertToEntity(EventDTO dto, EventEntity entity) {
    	entity.setId(dto.getId());
    	entity.setVersion(dto.getVersion());
    	entity.setCode(dto.getCode());
    	entity.setName(dto.getName());
        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link BaseDTO}
     * @param entity - {@link SubscriptionActivityEntity}
     * @return {@link UserUserFunctionDTO}
     */
    @Override
    public EventDTO convertToDTO(EventEntity entity, EventDTO dto) {
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
    	dto.setCode(entity.getCode());
    	dto.setName(entity.getName());
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link SubscriptionActivityEntity}
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