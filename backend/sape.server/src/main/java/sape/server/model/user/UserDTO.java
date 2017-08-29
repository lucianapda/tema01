package sape.server.model.user;

import sape.server.model.base.BaseDTO;
import sape.server.model.userfunction.UserFunctionDTO;

/**
 * Representa um {@link UserEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class UserDTO extends BaseDTO {

	private Long code;
	private String cpf;
	private String name;
	private String email;
	private Byte situation;
	private Integer acessProfile;
    private UserFunctionDTO userFunction;
	private String phone;

	/**
	 * Retorna uma instancia de {@link Long}
	 * @return {@link Long}
	 */
	public Long getCode() {
		return code;
	}

	/**
	 * Atribui um {@link Long}
	 * @param code - {@link Long}
	 */
	public void setCode(Long code) {
		this.code = code;
	}

	/**
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getCpf() {
		return cpf;
	}

	/**
	 * Atribui um {@link String}
	 * @param cpf - {@link String}
	 */
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	/**
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getName() {
		return name;
	}

	/**
	 * Atribui um {@link String}
	 * @param name - {@link String}
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Atribui um {@link String}
	 * @param email - {@link String}
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Retorna uma instancia de {@link Byte}
	 * @return {@link Byte}
	 */
	public Byte getSituation() {
		return situation;
	}

	/**
	 * Atribui um {@link Byte}
	 * @param situation - {@link Byte}
	 */
	public void setSituation(Byte situation) {
		this.situation = situation;
	}

	/**
	 * Retorna uma instancia de {@link Integer}
	 * @return {@link Integer}
	 */
	public Integer getAcessProfile() {
		return acessProfile;
	}

	/**
	 * Atribui um {@link Integer}
	 * @param acessProfile - {@link Integer}
	 */
	public void setAcessProfile(Integer acessProfile) {
		this.acessProfile = acessProfile;
	}

	/**
	 * Retorna uma instancia de {@link UserFunctionDTO}
	 * @return {@link UserFunctionDTO}
	 */
	public UserFunctionDTO getUserFunction() {
		return userFunction;
	}

	/**
	 * Atribui um {@link UserFunctionDTO}
	 * @param userFunction - {@link UserFunctionDTO}
	 */
	public void setUserFunction(UserFunctionDTO userFunction) {
		this.userFunction = userFunction;
	}

	/**
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * Atribui um {@link String}
	 * @param phone - {@link String}
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
}