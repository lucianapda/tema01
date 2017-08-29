package sape.server.crud.user.repository;

import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.user.UserEntity;

/**
 * Respositório de {@link SubscriptionActivityEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class UserCRUDRepository extends AbstractCRUDRepository<UserEntity> {
}