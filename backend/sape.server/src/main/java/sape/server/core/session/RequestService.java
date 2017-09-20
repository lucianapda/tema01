package sape.server.core.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;

import sape.server.core.utils.ClassUtils;
import sape.server.crud.user.service.UserQueryService;
import sape.server.model.user.UserEntity;

/**
 *  Serviço que disponibiliza informaões da requisição.
 *
 * @autor Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Service
public class RequestService {

	@Autowired
	private UserQueryService userQueryService;

	/**
	 * Retorna o {@link UserEntity} vinculado a requisição, ele será
	 * recuperado a partir do token enviado no cabeçalho da requisição.
	 * @return {@link UserEntity}
	 */
	public UserEntity getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null) {
			OAuth2Authentication oAuth2Authentication = ClassUtils.toAssignable(OAuth2Authentication.class, authentication);
			if (oAuth2Authentication != null) {
				UserDetails userDetails = ClassUtils.toAssignable(UserDetails.class, oAuth2Authentication.getPrincipal());
				if (userDetails != null) {
					return userQueryService.getUserByUsername(userDetails.getUsername());
				}
			}
		}
		return null;
	}
}