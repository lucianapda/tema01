package sape.server.crud.person.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.crud.person.repository.PersonCRUDRepository;
import sape.server.model.base.BaseDTO;
import sape.server.model.person.PersonDTO;
import sape.server.model.person.PersonEntity;
import sape.server.model.person.contact.PersonContactDTO;
import sape.server.model.person.contact.PersonContactEntity;

/**
 * Serviço de persistencia de {@link PersonEntity}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class PersonCRUDService extends AbstractCRUDService<PersonEntity, PersonDTO> {

    @Autowired
    private PersonCRUDRepository personCRUDRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    protected AbstractCRUDRepository<PersonEntity> getCRUDRepository() {
        return personCRUDRepository;
    }

    /**
     * Converte os dados do dto para entity.
     * @param dto    - {@link BaseDTO}
     * @param entity - {@link PersonEntity}
     * @return {@link PersonEntity}
     */
    @Override
    public PersonEntity convertToEntity(PersonDTO dto, PersonEntity entity) {
    	entity.setId(dto.getId());
    	entity.setVersion(dto.getVersion());
    	entity.setCode(dto.getCode());
    	entity.setName(dto.getName());
    	entity.setBirthDate(dto.getBirthDate());
    	entity.setCpf(dto.getCpf());

    	List<PersonContactEntity> contactsUpdated = new ArrayList<>();
    	dto.getContacts().forEach(contact -> {
    		PersonContactEntity personContactEntity = null;
    		if (contact.getId() != null) {
    			Optional<PersonContactEntity> findFirst = entity.getContacts().stream().filter(t -> contact.getId() == t.getId()).findFirst();
    			if (findFirst.isPresent()) {
					personContactEntity = findFirst.get();
    			}
			}
    		if (personContactEntity == null){
				personContactEntity = new PersonContactEntity();
				personContactEntity.setId(contact.getId());
				personContactEntity.setVersion(contact.getVersion());
			}
    		personContactEntity.setCode(contact.getCode());
    		personContactEntity.setDescription(contact.getDescription());
    		personContactEntity.setPerson(entity);
    		contactsUpdated.add(personContactEntity);
			entity.getContacts().add(personContactEntity);
		});


		for (Iterator<PersonContactEntity> iterator = entity.getContacts().iterator(); iterator.hasNext();) {
			PersonContactEntity personContactEntity = iterator.next();
			if (!contactsUpdated.stream().filter(t -> t.getId() == null || personContactEntity.getId() == t.getId()).findFirst().isPresent()) {
				iterator.remove();
			}
		}

        return entity;
    }

    /**
     * Converte os dados do entity para dto.
     * @param dto    - {@link BaseDTO}
     * @param entity - {@link PersonEntity}
     * @return {@link UserUserFunctionDTO}
     */
    @Override
    public PersonDTO convertToDTO(PersonEntity entity, PersonDTO dto) {
    	dto.setId(entity.getId());
    	dto.setVersion(entity.getVersion());
    	dto.setCode(entity.getCode());
    	dto.setName(entity.getName());
    	dto.setBirthDate(entity.getBirthDate());
    	dto.setCpf(entity.getCpf());
    	entity.getContacts().forEach(t -> {
			PersonContactDTO personContactDTO = new PersonContactDTO();
			personContactDTO.setId(t.getId());
			personContactDTO.setVersion(t.getVersion());
			personContactDTO.setCode(t.getCode());
			personContactDTO.setDescription(t.getDescription());
			personContactDTO.setIdPerson(t.getPerson().getId());
			dto.getContacts().add(personContactDTO);
		});
        return dto;
    }

    /**
     * Cria uma entidade nova e vazia.
     * @return {@link PersonEntity}
     */
    @Override
    public PersonEntity createEmptyEntity() {
        return new PersonEntity();
    }

    @Override
    public PersonDTO createEmptyDTO() {
        return new PersonDTO();
    }

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void internalValidate(PersonEntity entity) {

	}
}