package sape.server.core.spring.config.init;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import sape.server.core.spring.config.root.SpringFrameworkRootConfigurer;
import sape.server.core.spring.config.security.SpringWebSecurityConfigurerAdapter;
import sape.server.core.spring.context.ManagerInstance;

/**
 * Inicializador do contexto do spring.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class AnnotationConfigDispatcherServletInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    /**
     * {@inheritDoc}
     */
    @Override
    protected ApplicationContextInitializer<?>[] getServletApplicationContextInitializers() {
    	return new ApplicationContextInitializer[]{(ApplicationContextInitializer<ConfigurableApplicationContext>) applicationContext -> ManagerInstance.setConfigurableApplicationContext(applicationContext)};
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{SpringFrameworkRootConfigurer.class};
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{SpringWebSecurityConfigurerAdapter.class};
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}