package sape.server.core.spring.config.security;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;

import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

import sape.server.core.servlet.filter.cors.CORSFilter;

/**
 * Define o local de possiveis custmizações na inicialização do servlet
 *
 * @autor Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class MySecurityWebApplicationInitializer extends AbstractSecurityWebApplicationInitializer{

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected void beforeSpringSecurityFilterChain(ServletContext servletContext) {
		FilterRegistration corsFilterReg = servletContext.addFilter("simpleCORSFilter", CORSFilter.class);
        corsFilterReg.addMappingForUrlPatterns(null, false, "/*");
	}
}