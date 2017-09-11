package sape.server.crud.user.service;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sape.server.core.criteria.CriteriaFactory;
import sape.server.core.utils.ClassUtils;
import sape.server.model.user.UserEntity;

/**
 * Serviço de consulta de usuário.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class UserQueryService {

    @Autowired
    private CriteriaFactory criteriaFactory;

    @Transactional(readOnly = true)
    public UserEntity getUserByName(String name) {
        Criteria q = criteriaFactory.createCriteria(UserEntity.class);
        q.add(Restrictions.eq(UserEntity.NAME, name));
        return ClassUtils.toAssignable(UserEntity.class, q.uniqueResult());
    }

    @Transactional(readOnly = true)
    public UserEntity getUserByUsername(String username) {
        Criteria q = criteriaFactory.createCriteria(UserEntity.class);
        q.add(Restrictions.eq(UserEntity.NAME, username));
        return ClassUtils.toAssignable(UserEntity.class, q.uniqueResult());
    }

    @Transactional(readOnly = true)
    public UserEntity getUserByCPF(String cpf) {
        Criteria q = criteriaFactory.createCriteria(UserEntity.class);
        q.add(Restrictions.eq(UserEntity.CPF, cpf));
        return ClassUtils.toAssignable(UserEntity.class, q.uniqueResult());
    }
}