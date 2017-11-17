package sape.server.crud.subscription.repository;

import org.apache.commons.lang3.math.NumberUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.event.activity.EventActivityEntity;
import sape.server.model.subscription.SubscriptionEntity;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Respositório de {@link SubscriptionEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class SubscriptionCRUDRepository extends AbstractCRUDRepository<SubscriptionEntity> {

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void applyQuery(Criteria criteriaQuery, String query) {
		if (query.startsWith("idEvent=")) {
			String idEvent = query.substring(query.indexOf("="));
			if (!idEvent.isEmpty() && NumberUtils.isNumber(idEvent)) {
				criteriaQuery.createAlias(SubscriptionEntity.ACTIVITIES, SubscriptionEntity.ACTIVITIES);
				criteriaQuery.createAlias(SubscriptionEntity.ACTIVITIES + "."+  SubscriptionActivityEntity.ACTIVITY, SubscriptionActivityEntity.ACTIVITY);
				criteriaQuery.createAlias(SubscriptionActivityEntity.ACTIVITY + "."+  EventActivityEntity.EVENT, EventActivityEntity.EVENT);
				criteriaQuery.add(Restrictions.eq(EventActivityEntity.EVENT + ".id", Long.valueOf(idEvent)));
			}
		}
	}
}