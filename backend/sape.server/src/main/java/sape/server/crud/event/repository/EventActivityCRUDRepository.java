
package sape.server.crud.event.repository;

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
}