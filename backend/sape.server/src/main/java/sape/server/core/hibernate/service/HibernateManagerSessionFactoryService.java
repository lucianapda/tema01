package sape.server.core.hibernate.service;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Serviço padrão que gerencia a {@link org.hibernate.SessionFactory} da aplicação.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public final class HibernateManagerSessionFactoryService {

    @Autowired
    private SessionFactory sessionFactory;

    /**
     * Retorna o sessionFactory - {@link SessionFactory}
     * @return {@link SessionFactory}
     */
    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    /**
     * Retorna o sessionFactory - {@link Session}
     * @return {@link Session}
     */
    public Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }
}