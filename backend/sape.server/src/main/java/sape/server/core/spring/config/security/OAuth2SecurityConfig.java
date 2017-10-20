package sape.server.core.spring.config.security;

import java.util.Arrays;

import org.hibernate.internal.SessionFactoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.approval.ApprovalStore;
import org.springframework.security.oauth2.provider.approval.TokenApprovalStore;
import org.springframework.security.oauth2.provider.approval.TokenStoreUserApprovalHandler;
import org.springframework.security.oauth2.provider.request.DefaultOAuth2RequestFactory;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import sape.server.core.hibernate.config.HibernateConfig;
import sape.server.core.hibernate.transaction.CustomHibernateTransactionManager;
import sape.server.core.spring.config.user.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableTransactionManagement
public class OAuth2SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private ClientDetailsService clientService;
	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService);
    }

	/**
	 * {@inheritDoc}
	 */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
		http.cors()
			.and()
			.csrf().disable()
			.anonymous().disable()
			.authorizeRequests().antMatchers("/oauth/token", "/oauth/check_token").permitAll();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

    /**
	 * {@inheritDoc}
	 */
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
	public TokenStore tokenStore(){
		return new InMemoryTokenStore();
	}

	@Bean
	@Autowired
	public TokenStoreUserApprovalHandler userApprovalHandler(TokenStore tokenStore){
		TokenStoreUserApprovalHandler handler = new TokenStoreUserApprovalHandler();
		handler.setTokenStore(tokenStore);
		handler.setRequestFactory(new DefaultOAuth2RequestFactory(clientService));
		handler.setClientDetailsService(clientService);
		return handler;
	}

	@Bean
	@Autowired
	public ApprovalStore approvalStore(TokenStore tokenStore) throws Exception {
		TokenApprovalStore store = new TokenApprovalStore();
		store.setTokenStore(tokenStore);
		return store;
	}

	/**
	 * Bean que inicializa a condiguração do gerenciador de transação.
	 */
	@Bean
    public HibernateTransactionManager txManager() {
        SessionFactoryImpl sessionFactory = (SessionFactoryImpl) sessionFactory().getObject();
        HibernateTransactionManager htm = new CustomHibernateTransactionManager(sessionFactory);
        htm.setAutodetectDataSource(false);
        return htm;
    }

	/**
	 * Bean de configuração da sessionFactory.
	 */
    @Bean
    public LocalSessionFactoryBean sessionFactory() {
        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        sessionFactory.setPackagesToScan(new String[] { "sape.server" });
        sessionFactory.setHibernateProperties(HibernateConfig.getDefaultProperties());
        return sessionFactory;
    }
}