package sape.server.crud.activity.repository;

import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.activity.ActivityEntity;

/**
 * Respositório de {@link ActivityEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class ActivityCRUDRepository extends AbstractCRUDRepository<ActivityEntity> {
}