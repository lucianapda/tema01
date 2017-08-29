package sape.server.crud.base.repository;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import sape.server.core.criteria.CriteriaFactory;
import sape.server.core.exception.ValidationException;
import sape.server.core.exception.crud.ValidationCRUDException;
import sape.server.core.hibernate.service.HibernateHandleSessionService;
import sape.server.core.spring.context.ManagerInstance;
import sape.server.core.utils.ClassUtils;
import sape.server.model.base.BaseEntity;

/**
 * Classe base para implementações de CRUD repositories.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 *
 * @param <E> - Implementação de {@link BaseEntity}
 */
public abstract class AbstractCRUDRepository<E extends BaseEntity> {

    private Logger log = LogManager.getLogger();

    @Autowired
    private HibernateHandleSessionService hibernateHandleSessionService;

    private CriteriaFactory criteriaFactory;

    /**
     * Retorna o criteriaFactory - {@link CriteriaFactory}
     * @return {@link CriteriaFactory}
     */
    private CriteriaFactory getCriteriaFactory() {
        if (criteriaFactory == null) {
			criteriaFactory = ManagerInstance.get(CriteriaFactory.class);
		}
        return criteriaFactory;
    }

    /**
     * Salva a entidade e retorna a entidade salva.
     * @param entity - {@link E}
     * @return {@link E} - salvo.
     * @throws ValidationException
     */
    @Transactional(rollbackFor = Throwable.class)
    public E save(E entity) throws ValidationException {
        return hibernateHandleSessionService.saveOrUpdate(entity);
    }

    /**
     * Busca a entidade a partir do id.
     * @param id - {@link E#getId()}
     * @return {@link E} - salvo ou null caso não encontrar.
     */
    @Transactional(rollbackFor = Throwable.class, readOnly = true)
    public E get(Long id) {
        try {
            return (E) hibernateHandleSessionService.get(ClassUtils.getGenericType(getClass(), BaseEntity.class), id);
        } catch (ValidationException e) {
            log.error(e);
        }
        return null;
    }

    /**
     * Busca todas as entidades.
     * @return {@link List} of {@link E}.
     */
    @Transactional(rollbackFor = Throwable.class, readOnly = true)
    public List<E> getAll() {
        return getCriteriaFactory().createCriteria(ClassUtils.getGenericType(getClass(), BaseEntity.class)).list();
    }

    /**
     * Busca todas as entidades, aplicando {@link Criterion}.
     * @return {@link List} of {@link E}.
     */
    @Transactional(rollbackFor = Throwable.class, readOnly = true)
    public List<E> getAll(Criterion... criterions) {
        Criteria criteria = getCriteriaFactory().createCriteria(ClassUtils.getGenericType(getClass(), BaseEntity.class));
        for (Criterion c : criterions) {
            criteria.add(c);
        }
        return criteria.list();
    }

    /**
     * Busca a entidade a partir do id.
     * @param criterions - {@link Criterion}[]
     * @return {@link List} of {@link E}
     * @throws ValidationCRUDException dispara exceção caso encontre mais de um objeto.
     */
    @Transactional(rollbackFor = Throwable.class, readOnly = true)
    public E getUnique(Criterion... criterions) throws ValidationCRUDException {
        Criteria criteria = getCriteriaFactory().createCriteria(ClassUtils.getGenericType(getClass(), BaseEntity.class));
        for (Criterion c : criterions) {
            criteria.add(c);
        }
        return (E) criteria.uniqueResult();
    }

    /**
     * Deleta a entidade especificado.
     * @param entity - {@link E}
     */
    @Transactional(rollbackFor = Throwable.class)
    public void delete(E entity) throws ValidationException {
        hibernateHandleSessionService.delete(entity);
    }

    /**
     * Realiza o lock na entidade impedindo alterações.
     * @param entity - {@link E}
     */
    @Transactional(rollbackFor = Throwable.class)
    public void lock(E entity) throws ValidationException {
        hibernateHandleSessionService.lock(entity);
    }
}