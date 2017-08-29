package sape.server.crud.userfunction.repository;

import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.event.EventEntity;

/**
 * Respositório de {@link SubscriptionActivityEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class UserFunctionCRUDRepository extends AbstractCRUDRepository<EventEntity> {
}