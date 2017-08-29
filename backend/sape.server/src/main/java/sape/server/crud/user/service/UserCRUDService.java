package sape.server.crud.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.core.exception.ValidationException;
import sape.server.core.exception.crud.ValidationCRUDException;
import sape.server.core.utils.StringUtils;
import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.user.repository.UserCRUDRepository;
import sape.server.crud.userfunction.service.UserFunctionCRUDService;
import sape.server.model.base.BaseDTO;
import sape.server.model.user.UserDTO;
import sape.server.model.user.UserEntity;
import sape.server.model.userfunction.UserFunctionEntity;

/**
 * Serviço de persistencia de {@link UserEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class UserCRUDService extends AbstractCRUDService<UserEntity, UserDTO> {

    @Autowired
    private UserCRUDRepository userCRUDRepository;
    @Autowired
    private UserFunctionCRUDService userFunctionCRUDService;
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
     * @param entity - {@link UserFunctionEntity}
     * @return {@link UserFunctionEntity}
     */
    @Override
    public UserEntity convertToEntity(UserDTO dto, UserEntity entity) {
    	entity.setCode(dto.getCode());
    	entity.setCpf(dto.getCpf());
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setSituation(dto.getSituation());
        entity.setAcessProfile(dto.getAcessProfile());
        entity.setPhone(dto.getPhone());
        if (dto.getUserFunction() != null) {
			entity.setUserFunction(userFunctionCRUDService.getEntity(dto.getUserFunction().getId()));
		}
        entity.setId(dto.getId());
        entity.setVersion(dto.getVersion());
        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link BaseDTO}
     * @param entity - {@link UserFunctionEntity}
     * @return {@link UserCityDTO}
     */
    @Override
    public UserDTO convertToDTO(UserEntity entity, UserDTO dto) {
    	dto.setCode(entity.getCode());
    	dto.setCpf(entity.getCpf());
    	dto.setName(entity.getName());
    	dto.setEmail(entity.getEmail());
    	dto.setSituation(entity.getSituation());
    	dto.setAcessProfile(entity.getAcessProfile());
    	dto.setPhone(entity.getPhone());
    	dto.setUserFunction(userFunctionCRUDService.getDTO(entity.getUserFunction().getId()));
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link UserFunctionEntity}
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