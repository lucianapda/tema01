package sape.server.crud.person.repository;

import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.person.contact.PersonContactEntity;

/**
 * Respositório de {@link PersonContactEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class PersonContactCRUDRepository extends AbstractCRUDRepository<PersonContactEntity> {
}