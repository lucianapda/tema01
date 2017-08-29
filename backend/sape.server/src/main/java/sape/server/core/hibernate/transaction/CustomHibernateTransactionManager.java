package sape.server.core.hibernate.transaction;

import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate5.HibernateTransactionManager;

/**
 * Implementação de {@link HibernateTransactionManager} para quer seja possível configurar para que não autodetectDatasource.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class CustomHibernateTransactionManager extends HibernateTransactionManager {

    /**
     * Create a new HibernateTransactionManager instance.
     * @param sessionFactory SessionFactory to manage transactions for
     */
    public CustomHibernateTransactionManager(SessionFactory sessionFactory) {
        this.setSessionFactory(sessionFactory);
        this.setAutodetectDataSource(false);
        afterPropertiesSet();
    }
}
