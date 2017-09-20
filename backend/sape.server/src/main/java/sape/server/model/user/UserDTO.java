package sape.server.model.user;

import java.time.LocalDate;

import sape.server.model.base.BaseDTO;
import sape.server.model.person.contact.PersonContactEntity;

/**
 * Representa um {@link PersonContactEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class UserDTO extends BaseDTO {

	private Long code;
	private String name;
    private LocalDate birthDate;
	private String cpf;
	private String username;
	private String password;
	private String email;

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
	 * Retorna uma instancia de {@link LocalDate}
	 * @return {@link LocalDate}
	 */
	public LocalDate getBirthDate() {
		return birthDate;
	}

	/**
	 * Atribui um {@link LocalDate}
	 * @param birthDate - {@link LocalDate}
	 */
	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
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
	public String getUsername() {
		return username;
	}

	/**
	 * Atribui um {@link String}
	 * @param username - {@link String}
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Atribui um {@link String}
	 * @param password - {@link String}
	 */
	public void setPassword(String password) {
		this.password = password;
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
}