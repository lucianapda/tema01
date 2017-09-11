package sape.server.crud.subscription.repository;

import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.subscription.SubscriptionEntity;

/**
 * Respositório de {@link SubscriptionEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class SubscriptionCRUDRepository extends AbstractCRUDRepository<SubscriptionEntity> {
}