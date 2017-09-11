
package sape.server.crud.event.repository;

import org.springframework.stereotype.Repository;

import sape.server.crud.base.repository.AbstractCRUDRepository;
import sape.server.model.event.EventEntity;

/**
 * Respositório de {@link EventEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Repository
public class EventCRUDRepository extends AbstractCRUDRepository<EventEntity> {
}