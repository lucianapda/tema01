package sape.server.model.entry;

import java.time.LocalDateTime;

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
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Representa uma entrada.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Entity
@Table(name = "entry")
public class EntryEntity extends BaseEntity {

	public static final String CODE = "code";
    public static final String DATE_ENTRY = "dateEntry";
    public static final String DATE_DEPARTURE = "dateDeparture";
    public static final String SUBSCRIPTION_ACTIVITY = "subscriptionActivity";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_entry", nullable = false)
	private Long id;

	@NotNull
	@Column(nullable = false, name = "code_entry")
	private Long code;

	@NotNull
	@Column(nullable = false, name = "date_entry_entry")
    private LocalDateTime dateEntry;

	@NotNull
	@Column(nullable = false, name = "date_departure_entry")
    private LocalDateTime dateDeparture;

	@NotNull
    @ManyToOne(targetEntity = SubscriptionActivityEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_entry_subscription_act"), nullable = false, name = "sub_activity_id_sub_activity")
    private SubscriptionActivityEntity subscriptionActivity;

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
	 * Retorna uma instancia de {@link LocalDateTime}
	 * @return {@link LocalDateTime}
	 */
	public LocalDateTime getDateEntry() {
		return dateEntry;
	}

	/**
	 * Atribui um {@link LocalDateTime}
	 * @param dateEntry - {@link LocalDateTime}
	 */
	public void setDateEntry(LocalDateTime dateEntry) {
		this.dateEntry = dateEntry;
	}

	/**
	 * Retorna uma instancia de {@link LocalDateTime}
	 * @return {@link LocalDateTime}
	 */
	public LocalDateTime getDateDeparture() {
		return dateDeparture;
	}

	/**
	 * Atribui um {@link LocalDateTime}
	 * @param dateDeparture - {@link LocalDateTime}
	 */
	public void setDateDeparture(LocalDateTime dateDeparture) {
		this.dateDeparture = dateDeparture;
	}

	/**
	 * Retorna uma instancia de {@link SubscriptionActivityEntity}
	 * @return {@link SubscriptionActivityEntity}
	 */
	public SubscriptionActivityEntity getSubscriptionActivity() {
		return subscriptionActivity;
	}

	/**
	 * Atribui um {@link SubscriptionActivityEntity}
	 * @param subscriptionActivity - {@link SubscriptionActivityEntity}
	 */
	public void setSubscriptionActivity(SubscriptionActivityEntity subscriptionActivity) {
		this.subscriptionActivity = subscriptionActivity;
	}
}