package sape.server.crud.subscription.activity.repository;

import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Respositório de {@link SubscriptionActivityEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class SubscriptionActivityCRUDRepository extends AbstractCRUDRepository<SubscriptionActivityEntity> {
}