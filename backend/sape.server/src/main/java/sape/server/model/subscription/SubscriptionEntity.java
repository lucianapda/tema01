package sape.server.model.subscription;

import java.time.LocalDate;

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
 * Representa um evento.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Entity
@Table(name = "subscription")
public class SubscriptionEntity extends BaseEntity {

	public static final String CODE = "code";
	public static final String PERSON = "person";
    public static final String DATE = "date";

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_subscription", nullable = false)
	private Long id;

	@NotNull
	@Column(nullable = false, name = "code_subscription")
	private Long code;

	@NotNull
	@Column(nullable = false, name = "date_subscription")
    private LocalDate date;

	@NotNull
    @ManyToOne(targetEntity = PersonEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_subscription_person"), nullable = false, name = "person_id_person")
    private PersonEntity person;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Long getId() {
		return this.id;
	}

	/**
	 * {@inheritDoc}
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
	 * Retorna uma instancia de {@link LocalDate}
	 * @return {@link LocalDate}
	 */
	public LocalDate getDate() {
		return date;
	}

	/**
	 * Atribui um {@link LocalDate}
	 * @param date - {@link LocalDate}
	 */
	public void setDate(LocalDate date) {
		this.date = date;
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