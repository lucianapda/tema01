package sape.server.model.person;

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
 * Representa uma pessoa.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Entity
@Table(name = "person")
public class PersonEntity extends BaseEntity {

	public static final String CODE = "code";
	public static final String NAME = "name";
	public static final String CPF = "cpf";
	public static final String BIRTH_DAY = "birthDay";

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_person", nullable = false)
	private Long id;

	@NotNull
	@Column(nullable = false, name = "code_person")
	private Long code;

	@NotNull
	@Column(nullable = false, name = "name_person", length=100)
	private String name;

    @Column(name = "birth_day_person")
    private LocalDate birthDate;

	@NotNull
	@Column(nullable = false, name = "cpf_person", length=20)
	private String cpf;

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
}