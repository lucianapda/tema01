package sape.server.crud.userfunction.service;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sape.server.core.criteria.CriteriaFactory;
import sape.server.model.userfunction.UserFunctionEntity;

/**
 * Serviço de consulta de cidades.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class UserFunctionQueryService {

    @Autowired
    private CriteriaFactory criteriaFactory;

    @Transactional(readOnly = true)
    public List<UserFunctionEntity> getFunctionsByName(String name) {
        Criteria q = criteriaFactory.createCriteria(UserFunctionEntity.class);
        q.add(Restrictions.like(UserFunctionEntity.NAME, name, MatchMode.ANYWHERE));
        return q.list();
    }
}