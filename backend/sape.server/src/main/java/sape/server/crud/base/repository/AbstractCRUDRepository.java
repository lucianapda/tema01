package sape.server.crud.base.repository;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaQuery;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.BasicTransformerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import sape.server.core.criteria.CriteriaFactory;
import sape.server.core.exception.ValidationException;
import sape.server.core.exception.crud.ValidationCRUDException;
import sape.server.core.exception.error.ValidationError;
import sape.server.core.hibernate.service.HibernateHandleSessionService;
import sape.server.core.session.RequestService;
import sape.server.core.spring.context.ManagerInstance;
import sape.server.core.utils.ClassUtils;
import sape.server.core.utils.FieldUtils;
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

    private RequestService requestService;

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
	 * Retorna uma instancia de {@link RequestService}
	 * @return {@link RequestService}
	 */
	public RequestService getRequestService() {
		if (requestService == null) {
			requestService = ManagerInstance.get(RequestService.class);
		}
		return requestService;
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
    @SuppressWarnings("unchecked")
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
    @SuppressWarnings("unchecked")
	@Transactional(rollbackFor = Throwable.class, readOnly = true)
    public List<E> getAll() {
        Criteria createCriteria = getCriteriaFactory().createCriteria(ClassUtils.getGenericType(getClass(), BaseEntity.class));
        applyFilterToGetAll(createCriteria);
		return createCriteria.list();
    }

    /**
	 * Sobrescrever para filtros no getAll.
	 * @param um {@link Criteria}
	 */
	protected void applyFilterToGetAll(Criteria createCriteria) {}

	/**
     * Busca todas as entidades, aplicando {@link Criterion}.
     * @return {@link List} of {@link E}.
     * @throws ValidationException
     */
    @SuppressWarnings("unchecked")
	@Transactional(rollbackFor = Throwable.class, readOnly = true)
    public List<E> getAll(List<String> filters,
						  List<String> sort,
						  List<String> fields,
						  String query,
						  Integer page,
						  Integer per_page) throws ValidationException {
        Class<? extends BaseEntity> genericType = ClassUtils.getGenericType(getClass(), BaseEntity.class);

        List<ValidationError> errors = new LinkedList<>();

        // Filters
        Map<String, Object> mapFilters = new HashMap<>();
        if (filters != null) {
	        for (String filter : filters) {
	        	String filterField = filter.substring(0, filter.indexOf("="));
	        	String filterValue = filter.substring(filter.indexOf("=")+1);
				//String value = entry.getValue();
				Field fieldFound = null;
				// Search field
				try {
					fieldFound = genericType.getDeclaredField(filterField.replaceAll("-", "").replaceAll("%", ""));
				} catch (NoSuchFieldException | SecurityException e) {
					errors.add(new ValidationError(10L, String.format("Campo \"%s\" não encontrado.", filterField), ""));
				}

				// if not found add error
				if (fieldFound != null) {
					Class<?> type = fieldFound.getType();
					if (ClassUtils.toName(Long.class, type.getName())) {
						mapFilters.put(filterField, Long.valueOf(filterValue));
					} else if (ClassUtils.toName(String.class, type.getName())) {
						mapFilters.put(filterField, filterValue);
					}
				}
	        }
		}
        // Sort
        if (sort != null) {
	        for (String field : sort) {
				try {
					genericType.getDeclaredField(field.replace("-", ""));
				} catch (NoSuchFieldException | SecurityException e) {
					errors.add(new ValidationError(10L, String.format("Campo \"%s\" não encontrado.", field), ""));
				}
			}
        }
        // Fields
        if (fields != null) {
	        for (String field : fields) {
				try {
					genericType.getDeclaredField(field);
				} catch (NoSuchFieldException | SecurityException e) {
					errors.add(new ValidationError(10L, String.format("Campo \"%s\" não encontrado.", field), ""));
				}
			}
        }

        if (errors.isEmpty()) {
        	Criteria criteriaQuery = getCriteriaFactory().createCriteria(genericType);
        	Criteria criteriaQueryCount = getCriteriaFactory().createCriteria(genericType);

        	// Config projections
        	if (fields != null) {
        		ProjectionList projectionList = Projections.projectionList();
        		fields.forEach(t -> projectionList.add(Projections.property(t)));
        		criteriaQuery.setProjection(projectionList);
        	}
        	criteriaQueryCount.setProjection(Projections.rowCount());

        	// Config filters
        	mapFilters.forEach((field, value) -> {
        		if (field.startsWith("%") || field.endsWith("%")) {
        			value = field.startsWith("%")? "%" + value : value;
        			value = field.endsWith("%")? value + "%" : value;
        			field = field.replaceAll("%", "");
        			criteriaQuery.add(Restrictions.like(field, value));
        			criteriaQueryCount.add(Restrictions.like(field, value));
				} else if (field.startsWith("-")) {
        			criteriaQuery.add(Restrictions.ne(field.replaceAll("-", ""), value));
        			criteriaQueryCount.add(Restrictions.ne(field.replaceAll("-", ""), value));
        		} else {
        			criteriaQuery.add(Restrictions.eq(field, value));
        			criteriaQueryCount.add(Restrictions.eq(field, value));
        		}
        	});

        	if (sort != null) {
	        	// Config sort
	        	for (String s : sort) {
	        		if (s.startsWith("-")) {
	        			criteriaQuery.addOrder(Order.desc(s.replaceAll("-", "")));
	        		} else {
	        			criteriaQuery.addOrder(Order.asc(s));
	        		}
				}
        	}

//        	Number countResults = ClassUtils.toAssignable(Number.class, criteriaQueryCount.uniqueResult());

        	applyQuery(criteriaQuery, query);

        	// Cofing page and number of result
        	if (page == null) {
				page = 1;
			}
        	if (per_page == null) {
				per_page = 25;
			}
        	if (page == 1) {
        		criteriaQuery.setFirstResult(0);
			} else {
				criteriaQuery.setFirstResult(page * per_page);
			}
        	criteriaQuery.setMaxResults(per_page);

        	// if use projections make bind to entity manually
        	if (fields != null && !fields.isEmpty()) {
				criteriaQuery.setResultTransformer(new BasicTransformerAdapter() {
					@Override
					public Object transformTuple(Object[] tuple, String[] aliases) {
						BaseEntity newInstance = ClassUtils.getNewInstance(genericType);
						for (int i = 0; i < tuple.length; i++) {
							FieldUtils.setFieldValue(fields.get(i), newInstance, tuple[i]);
						}
						return newInstance;
					}
				});
			}

        	return criteriaQuery.list();
		} else {
			throw new ValidationException(errors);
		}
    }

    /**
	 * Sobrescrever para implementar uma query especifica
	 * @param criteriaQuery - {@link CriteriaQuery}
	 * @param query - {@link String}
	 * @return {@link void}
	 */
	protected void applyQuery(Criteria criteriaQuery, String query) {}

	/**
     * Busca a entidade a partir do id.
     * @param criterions - {@link Criterion}[]
     * @return {@link List} of {@link E}
     * @throws ValidationCRUDException dispara exceção caso encontre mais de um objeto.
     */
    @SuppressWarnings("unchecked")
	@Transactional(rollbackFor = Throwable.class, readOnly = true)
    public E getUnique(Criterion... criterions) throws ValidationCRUDException {
        Criteria criteria = getCriteriaFactory().createCriteria(ClassUtils.getGenericType(getClass(), BaseEntity.class));
        for (Criterion c : criterions) {
            criteria.add(c);
        }
        return ((E) criteria.uniqueResult());
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