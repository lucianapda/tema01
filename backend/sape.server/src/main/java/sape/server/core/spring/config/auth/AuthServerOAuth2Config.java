package sape.server.core.spring.config.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.approval.UserApprovalHandler;
import org.springframework.security.oauth2.provider.token.TokenStore;

@Configuration
@EnableAuthorizationServer
//@Order(-4)
public class AuthServerOAuth2Config extends AuthorizationServerConfigurerAdapter {

	private static String REALM="EXAMPLE_REALM";

	@Autowired
	private TokenStore tokenStore;

	@Autowired
	private UserApprovalHandler handler;

	@Autowired
	@Qualifier("authenticationManagerBean")
	private AuthenticationManager authManager;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		clients.inMemory()
	            .withClient("sapeClient") // client id
	            	.authorizedGrantTypes("password", "authorization_code", "refresh_token", "implicit")
	            	.authorities("ROLE_CLIENT", "ROLE_TRUSTED_CLIENT")
	            	.scopes("read", "write", "trust")
	            	.secret("P@ssw0rd")
	            	.accessTokenValiditySeconds(10000)//invalid after 2 minutes. sapeClient:P@ssw0rd
	            	.refreshTokenValiditySeconds(20000);//refresh after 10 minutes.
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.tokenStore(tokenStore)
				 .userApprovalHandler(handler)
				 .authenticationManager(authManager);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
		oauthServer.realm(REALM+"/client").checkTokenAccess("permitAll()");
	}
}