package sape.server.core.hibernate.multitenancy;

import org.hibernate.context.TenantIdentifierMismatchException;
import org.hibernate.context.spi.CurrentSessionContext;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;

/**
 * Implementação de um {@link CurrentTenantIdentifierResolver} para resolver qual identificador utilizar.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class HibernateCurrentTenantIdentifierResolverImpl implements CurrentTenantIdentifierResolver  {

    /**
     * Resolve the current tenant identifier.
     * @return The current tenant identifier
     */
    @Override
    public String resolveCurrentTenantIdentifier() {
        return "Default";
    }

    /**
     * Should we validate that the tenant identifier on "current sessions" that already exist when
     * {@link CurrentSessionContext#currentSession()} is called matches the value returned here from
     * {@link #resolveCurrentTenantIdentifier()}?
     * @return {@code true} indicates that the extra validation will be performed; {@code false} indicates it will not.
     * @see TenantIdentifierMismatchException
     */
    @Override
    public boolean validateExistingCurrentSessions() {
        return true;
    }
}