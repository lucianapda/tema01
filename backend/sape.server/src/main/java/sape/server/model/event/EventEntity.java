package sape.server.model.event;

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
import sape.server.model.person.contact.PersonContactEntity;
import sape.server.model.user.UserEntity;

/**
 * Representa um evento.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Entity
@Table(name = "event")
public class EventEntity extends BaseEntity {

	public static final String CODE = "code";
    public static final String PLACE = "place";
    public static final String DESCRIPTION = "description";
    public static final String DATE_START = "dateStart";
    public static final String DATE_END = "dateEnd";
    public static final String DATE_START_SUBSCRIPTION = "dateStartSubscription";
    public static final String DATE_END_SUBSCRIPTION = "dateEndSubscription";
    public static final String VACANCY = "vacancy";
    public static final String WAITING_LIST = "waitingList";
    public static final String USER = "user";

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_event", nullable = false)
	private Long id;

	@NotNull
	@Column(nullable = false, name = "code_event")
	private Long code;

	@Column(name = "place_event", length=100)
	private String place;

	@Column(name = "description_event", length=4000)
	private String description;

	@NotNull
	@Column(nullable = false, name = "date_start_event")
    private LocalDate dateStart;

	@NotNull
	@Column(nullable = false, name = "date_end_event")
    private LocalDate dateEnd;

	@NotNull
	@Column(nullable = false, name = "date_start_subscription_event")
    private LocalDate dateStartSubscription;

	@NotNull
	@Column(nullable = false, name = "date_end_subscription_event")
    private LocalDate dateEndSubscription;

	@NotNull
	@Column(nullable = false, name = "vacancy_event")
	private Integer vacancy;

	@NotNull
	@Column(nullable = false, name = "waiting_list_event")
	private Boolean waitingList;

	@NotNull
    @ManyToOne(targetEntity = UserEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_event_user"), nullable = false, name = "user_id_user")
    private UserEntity user;

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
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getPlace() {
		return place;
	}

	/**
	 * Atribui um {@link String}
	 * @param place - {@link String}
	 */
	public void setPlace(String place) {
		this.place = place;
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
	 * Retorna uma instancia de {@link LocalDate}
	 * @return {@link LocalDate}
	 */
	public LocalDate getDateStart() {
		return dateStart;
	}

	/**
	 * Atribui um {@link LocalDate}
	 * @param dateStart - {@link LocalDate}
	 */
	public void setDateStart(LocalDate dateStart) {
		this.dateStart = dateStart;
	}

	/**
	 * Retorna uma instancia de {@link LocalDate}
	 * @return {@link LocalDate}
	 */
	public LocalDate getDateEnd() {
		return dateEnd;
	}

	/**
	 * Atribui um {@link LocalDate}
	 * @param dateEnd - {@link LocalDate}
	 */
	public void setDateEnd(LocalDate dateEnd) {
		this.dateEnd = dateEnd;
	}

	/**
	 * Retorna uma instancia de {@link LocalDate}
	 * @return {@link LocalDate}
	 */
	public LocalDate getDateStartSubscription() {
		return dateStartSubscription;
	}

	/**
	 * Atribui um {@link LocalDate}
	 * @param dateStartSubscription - {@link LocalDate}
	 */
	public void setDateStartSubscription(LocalDate dateStartSubscription) {
		this.dateStartSubscription = dateStartSubscription;
	}

	/**
	 * Retorna uma instancia de {@link LocalDate}
	 * @return {@link LocalDate}
	 */
	public LocalDate getDateEndSubscription() {
		return dateEndSubscription;
	}

	/**
	 * Atribui um {@link LocalDate}
	 * @param dateEndSubscription - {@link LocalDate}
	 */
	public void setDateEndSubscription(LocalDate dateEndSubscription) {
		this.dateEndSubscription = dateEndSubscription;
	}

	/**
	 * Retorna uma instancia de {@link Integer}
	 * @return {@link Integer}
	 */
	public Integer getVacancy() {
		return vacancy;
	}

	/**
	 * Atribui um {@link Integer}
	 * @param vacancy - {@link Integer}
	 */
	public void setVacancy(Integer vacancy) {
		this.vacancy = vacancy;
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
	 * Retorna uma instancia de {@link PersonContactEntity}
	 * @return {@link PersonContactEntity}
	 */
	public UserEntity getUser() {
		return user;
	}

	/**
	 * Atribui um {@link PersonContactEntity}
	 * @param user - {@link PersonContactEntity}
	 */
	public void setUser(UserEntity user) {
		this.user = user;
	}
}