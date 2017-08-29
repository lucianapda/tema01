package sape.server.model.person.contact;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import sape.server.model.base.BaseEntity;
import sape.server.model.person.PersonEntity;

/**
 * Representa um contato de uma pessoa.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Entity
@Table(name = "person_contact")
public class PersonContactEntity extends BaseEntity {

	public static final String CODE = "code";
	public static final String DESCRIPTION = "description";
	public static final String PERSON = "person";

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_person_contact", nullable = false)
	private Long id;

	@NotNull
	@Column(nullable = false, name = "code_person_contact")
	private Long code;

	@NotNull
	@Column(nullable = false, name = "description_person_contact", length=100)
	private String description;

	@NotNull
    @ManyToOne(targetEntity = PersonEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_person_person_contact"), nullable = false, name = "person_id_person")
    private PersonEntity person;

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
	public String getDescription() {
		return description;
	}

	/**
	 * Atribui um {@link String}
	 * @param description - {@link String}
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * Retorna uma instancia de {@link PersonEntity}
	 * @return {@link PersonEntity}
	 */
	public PersonEntity getPerson() {
		return person;
	}

	/**
	 * Atribui um {@link PersonEntity}
	 * @param person - {@link PersonEntity}
	 */
	public void setPerson(PersonEntity person) {
		this.person = person;
	}
}