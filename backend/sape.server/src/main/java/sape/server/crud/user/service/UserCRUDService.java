package sape.server.crud.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.core.exception.ValidationException;
import sape.server.core.exception.crud.ValidationCRUDException;
import sape.server.core.utils.StringUtils;
import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.user.repository.UserCRUDRepository;
import sape.server.model.base.BaseDTO;
import sape.server.model.person.contact.PersonContactEntity;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;
import sape.server.model.user.UserDTO;
import sape.server.model.user.UserEntity;

/**
 * Serviço de persistencia de {@link PersonContactEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class UserCRUDService extends AbstractCRUDService<UserEntity, UserDTO> {

    @Autowired
    private UserCRUDRepository userCRUDRepository;
    @Autowired
    private UserQueryService userQueryService;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<UserEntity> getCRUDRepository() {
        return userCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link BaseDTO}
     * @param entity - {@link SubscriptionActivityEntity}
     * @return {@link SubscriptionActivityEntity}
     */
    @Override
    public UserEntity convertToEntity(UserDTO dto, UserEntity entity) {
    	entity.setId(dto.getId());
    	entity.setVersion(dto.getVersion());
    	entity.setCode(dto.getCode());
    	entity.setName(dto.getName());
    	entity.setBirthDate(dto.getBirthDate());
        entity.setCpf(dto.getCpf());
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());
        entity.setEmail(dto.getEmail());
        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link BaseDTO}
     * @param entity - {@link SubscriptionActivityEntity}
     * @return {@link UserCityDTO}
     */
    @Override
    public UserDTO convertToDTO(UserEntity entity, UserDTO dto) {
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
    	dto.setCode(entity.getCode());
    	dto.setName(entity.getName());
    	dto.setBirthDate(entity.getBirthDate());
    	dto.setCpf(entity.getCpf());
    	dto.setUsername(entity.getUsername());
    	dto.setPassword(entity.getPassword());
    	dto.setEmail(entity.getEmail());
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link SubscriptionActivityEntity}
     */
    @Override
    public UserEntity createEmptyEntity() {
        return new UserEntity();
    }

    @Override
    public UserDTO createEmptyDTO() {
        return new UserDTO();
    }

	/**
	 * {@inheritDoc}
	 * @throws ValidationException
	 */
	@Override
	protected void internalValidate(UserEntity entity) throws ValidationCRUDException {
		if (StringUtils.isNotEmpty(entity.getCpf())) {
			UserEntity anotherUser = userQueryService.getUserByCPF(entity.getCpf());
			if (anotherUser != null) {
				throw new ValidationCRUDException("Operação não realizada. Usuário já incluído.");
			}
		}
	}
}