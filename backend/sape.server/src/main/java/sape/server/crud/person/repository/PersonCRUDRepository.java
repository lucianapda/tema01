package sape.server.crud.person.repository;

import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.person.PersonEntity;

/**
 * Respositório de {@link PersonEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class PersonCRUDRepository extends AbstractCRUDRepository<PersonEntity> {

//	@Autowired
//	private PersonContactCRUDRepository personContactCRUDRepository;
//
//	/**
//	 * {@inheritDoc}
//	 */
//	@Override
//	@Transactional(rollbackFor = Throwable.class)
//	public PersonEntity save(PersonEntity entity) throws ValidationException {
//		if (entity.getId() == null) {
//			return this.save(entity);
//		}
//
//		List<PersonContactEntity> contacts = entity.getContacts();
//
//		List<PersonContactEntity> contactsToSave = new ArrayList<>();
//		List<PersonContactEntity> contactsToDelete = new ArrayList<>();
//
//		if (contacts == null || contacts.isEmpty()) {
//			Criteria
//		}
//	}
}