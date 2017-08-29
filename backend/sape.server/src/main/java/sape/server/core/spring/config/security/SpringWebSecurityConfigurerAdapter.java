package sape.server.core.spring.config.security;

import java.util.Arrays;

import org.hibernate.internal.SessionFactoryImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import sape.server.core.hibernate.config.HibernateConfig;
import sape.server.core.hibernate.transaction.CustomHibernateTransactionManager;

/**
 * Configuraçao do spring para web e segurança.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@EnableTransactionManagement
@EnableWebSecurity
@Configuration
@ComponentScan(basePackages = "sape.server")
public class SpringWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
		http.cors()
			.and()
			.authorizeRequests().anyRequest().permitAll();
    }

    @Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("POST, GET, PUT, DELETE"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

    //Create a transaction manager
    @Bean
    public HibernateTransactionManager txManager() {
        SessionFactoryImpl sessionFactory = (SessionFactoryImpl) sessionFactory().getObject();
        HibernateTransactionManager htm = new CustomHibernateTransactionManager(sessionFactory);
        htm.setAutodetectDataSource(false);
        return htm;
    }

    @Bean
    public LocalSessionFactoryBean sessionFactory() {
        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        sessionFactory.setPackagesToScan(new String[] { "sape.server" });
        sessionFactory.setHibernateProperties(HibernateConfig.getDefaultProperties());
        return sessionFactory;
    }
}