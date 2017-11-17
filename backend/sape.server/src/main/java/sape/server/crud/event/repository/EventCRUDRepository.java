
package sape.server.crud.event.repository;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.entry.EntryEntity;
import sape.server.model.event.EventEntity;
import sape.server.model.user.UserEntity;

/**
 * Respositório de {@link EntryEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class EventCRUDRepository extends AbstractCRUDRepository<EventEntity> {

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void applyFilterToGetAll(Criteria createCriteria) {
		UserEntity currentUser = getRequestService().getCurrentUser();
		createCriteria.add(Restrictions.eq(EventEntity.USER, currentUser));
	}
}