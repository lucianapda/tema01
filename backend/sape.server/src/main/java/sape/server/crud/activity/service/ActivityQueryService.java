package sape.server.crud.activity.service;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sape.server.core.criteria.CriteriaFactory;
import sape.server.model.activity.ActivityEntity;
import sape.server.model.event.EventEntity;

/**
 * Serviço de consulta de atividades.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class ActivityQueryService {

    @Autowired
    private CriteriaFactory criteriaFactory;

    @Transactional(readOnly = true)
    public List<EventEntity> getActivityByName(String name) {
        Criteria q = criteriaFactory.createCriteria(EventEntity.class);
        q.add(Restrictions.like(ActivityEntity.DESCRIPTION, name, MatchMode.ANYWHERE));
        return q.list();
    }
}