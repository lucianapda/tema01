
package sape.server.crud.event.repository;

import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.event.activity.EventActivityEntity;

/**
 * Respositório de {@link EventActivityEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class EventActivityCRUDRepository extends AbstractCRUDRepository<EventActivityEntity> {

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void applyQuery(Criteria criteriaQuery, String query) {
		if (query.startsWith("idEvent=")) {
			String idEvent = query.substring(query.indexOf("="));
			if (!idEvent.isEmpty() && NumberUtils.isNumber(idEvent)) {
				criteriaQuery.createAlias(EventActivityEntity.EVENT, EventActivityEntity.EVENT);
				criteriaQuery.add(Restrictions.eq(EventActivityEntity.EVENT + ".id", Long.valueOf(idEvent)));
			}
		}
	}
}