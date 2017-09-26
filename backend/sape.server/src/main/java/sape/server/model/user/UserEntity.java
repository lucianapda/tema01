package sape.server.model.user;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import sape.server.model.base.BaseEntity;

/**
 * Representa um usuário no sistema.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Entity
@Table(name = "user")
public class UserEntity extends BaseEntity {

	public static final String CODE = "code";
	public static final String NAME = "name";
	public static final String BIRTH_DAY = "birthDay";
	public static final String CPF = "cpf";
    public static final String USERNAME = "username";
    public static final String PASSWORD = "password";
    public static final String EMAIL = "email";
    public static final String EVENTS = "events";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_user", nullable = false)
	private Long id;

	@NotNull
	@Column(nullable = false, name = "code_user")
	private Long code;

	@NotNull
	@Column(nullable = false, name = "name_user", length=100)
	private String name;

	@NotNull
    @Column(name = "birth_day_user", nullable = false)
    private LocalDate birthDate;

	@NotNull
	@Column(nullable = false, name = "cpf_user", length=20)
	private String cpf;

	@NotNull
	@Column(nullable = false, name = "username_user", length=50)
	private String username;

	@NotNull
	@Column(nullable = false, name = "password_user", length=50)
	private String password;

	@Column(name = "email_user", length=255)
	private String email;

	/**
	 * Retorna uma instancia de {@link Long}
	 * @return {@link Long}
	 */
	@Override
	public Long getId() {
		return id;
	}

	/**
	 * Atribui um {@link Long}
	 * @param id - {@link Long}
	 */
	@Override
	public void setId(Long id) {
		this.id = id;
	}

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