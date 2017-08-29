package sape.server.model.subscription.activity;

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

import sape.server.model.activity.ActivityEntity;
import sape.server.model.base.BaseEntity;
import sape.server.model.subscription.SubscriptionEntity;

/**
 * Representa uma atividade.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Entity
@Table(name = "subscription_activity")
public class SubscriptionActivityEntity extends BaseEntity {

	public static final String CODE = "code";
	public static final String ACTIVITY = "activity";
    public static final String SUBSCRIPTION = "subscription";
    public static final String DATE = "date";
    public static final String WAITING_LIST = "waitingList";

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_subscription_activity", nullable = false)
	private Long id;

	@NotNull
	@Column(nullable = false, name = "code_subscription_activity")
	private Long code;

	@NotNull
	@Column(nullable = false, name = "date_subscription_activity")
    private LocalDateTime date;

	@NotNull
	@Column(nullable = false, name = "waiting_list_subscription_activity")
    private Boolean waitingList;

	@NotNull
    @ManyToOne(targetEntity = ActivityEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_subscription_activity_activity"), nullable = false, name = "activity_id_activity")
    private ActivityEntity activity;

	@NotNull
    @ManyToOne(targetEntity = SubscriptionEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_subscription_activity_subscription"), nullable = false, name = "subscription_id_subscription")
    private SubscriptionEntity subscription;

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
	public LocalDateTime getDate() {
		return date;
	}

	/**
	 * Atribui um {@link LocalDateTime}
	 * @param date - {@link LocalDateTime}
	 */
	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	/**
	 * Retorna uma instancia de {@link Boolean}
	 * @return {@link Boolean}
	 */
	public Boolean getWaitingList() {
		return waitingList;
	}

	/**
	 * Atribui um {@link Boolean}
	 * @param waitingList - {@link Boolean}
	 */
	public void setWaitingList(Boolean waitingList) {
		this.waitingList = waitingList;
	}

	/**
	 * Retorna uma instancia de {@link ActivityEntity}
	 * @return {@link ActivityEntity}
	 */
	public ActivityEntity getActivity() {
		return activity;
	}

	/**
	 * Atribui um {@link ActivityEntity}
	 * @param activity - {@link ActivityEntity}
	 */
	public void setActivity(ActivityEntity activity) {
		this.activity = activity;
	}

	/**
	 * Retorna uma instancia de {@link SubscriptionEntity}
	 * @return {@link SubscriptionEntity}
	 */
	public SubscriptionEntity getSubscription() {
		return subscription;
	}

	/**
	 * Atribui um {@link SubscriptionEntity}
	 * @param subscription - {@link SubscriptionEntity}
	 */
	public void setSubscription(SubscriptionEntity subscription) {
		this.subscription = subscription;
	}
}