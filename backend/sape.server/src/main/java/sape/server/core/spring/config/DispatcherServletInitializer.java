package sape.server.core.spring.config;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import sape.server.core.spring.config.mvc.WebMvcConfig;
import sape.server.core.spring.context.ManagerInstance;

/**
 * Inicializador do contexto do spring.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class DispatcherServletInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

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
        return null;
    }

    /**
	 * {@inheritDoc}
	 */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{WebMvcConfig.class};
    }

    /**
	 * {@inheritDoc}
	 */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

//    /**
//	 * {@inheritDoc}
//	 */
//    @Override
//    protected Filter[] getServletFilters() {
//        return new Filter[]{ new CORSFilter()};
//    }
}