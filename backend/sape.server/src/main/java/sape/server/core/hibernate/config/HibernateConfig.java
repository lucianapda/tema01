package sape.server.core.hibernate.config;

import java.util.Properties;

/**
 * Configura as properties do hibernate.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class HibernateConfig {

    /**
     * Retorna um {@link Properties} com todas as propriedades do arquivo .properties
     * @return {@link Properties}
     */
    public static Properties getDefaultProperties(){
        Properties properties = new Properties();

        properties.put("hibernate.connection.driver_class", "com.mysql.cj.jdbc.Driver");
        properties.put("hibernate.connection.password", "root");
        properties.put("hibernate.connection.url", "jdbc:mysql://localhost:3306/");
        properties.put("hibernate.connection.username", "root");
        properties.put("hibernate.default_catalog", "sape");
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        properties.put("hibernate.format_sql", "true");
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.connection.provider_class", "org.hibernate.c3p0.internal.C3P0ConnectionProvider");
        properties.put("hibernate.multiTenancy", "DATABASE");
        properties.put("hibernate.multi_tenant_connection_provider", "sape.server.core.hibernate.multitenancy.HibernateDataSourceBasedMultiTenantConnectionProviderImpl");
        properties.put("hibernate.tenant_identifier_resolver", "sape.server.core.hibernate.multitenancy.HibernateCurrentTenantIdentifierResolverImpl");

        properties.put("hibernate.c3p0.min_size", "5");
        properties.put("hibernate.c3p0.max_size", "20");
        properties.put("hibernate.c3p0.timeout", "300");
        properties.put("hibernate.c3p0.max_statements", "50");
        properties.put("hibernate.c3p0.idle_test_period", "3000");

        return properties;
    }
}