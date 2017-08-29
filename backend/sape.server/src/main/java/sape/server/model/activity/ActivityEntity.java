package sape.server.model.activity;

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
import sape.server.model.event.EventEntity;

/**
 * Representa uma atividade.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Entity
@Table(name = "activity")
public class ActivityEntity extends BaseEntity {

	public static final String CODE = "code";
	public static final String DESCRIPTION = "description";
    public static final String SPEAKER = "place";
    public static final String THEME = "dateStart";
    public static final String DATE_START = "dateEnd";
    public static final String DATE_END = "dateEnd";
    public static final String VACANCY = "vacancy";
    public static final String PLACE = "place";
    public static final String EVENT = "event";

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_activity", nullable = false)
	private Long id;

	@NotNull
	@Column(nullable = false, name = "code_activity")
	private Long code;

	@Column(name = "description_activity", length=4000)
	private String description;

	@NotNull
	@Column(name = "speaker_activity", length=100)
	private String speaker;

	@NotNull
	@Column(name = "theme_activity", length=255)
	private String theme;

	@NotNull
	@Column(nullable = false, name = "date_start_activity")
    private LocalDateTime dateStart;

	@NotNull
	@Column(nullable = false, name = "date_end_activity")
    private LocalDateTime dateEnd;

	@NotNull
	@Column(nullable = false, name = "vacancy_activity")
	private Integer vacancy;

	@NotNull
	@Column(nullable = false, name = "place_activity", length=100)
	private String place;

	@NotNull
    @ManyToOne(targetEntity = EventEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_activity_event"), nullable = false, name = "event_id_event")
    private EventEntity event;

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
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getSpeaker() {
		return speaker;
	}

	/**
	 * Atribui um {@link String}
	 * @param speaker - {@link String}
	 */
	public void setSpeaker(String speaker) {
		this.speaker = speaker;
	}

	/**
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getTheme() {
		return theme;
	}

	/**
	 * Atribui um {@link String}
	 * @param theme - {@link String}
	 */
	public void setTheme(String theme) {
		this.theme = theme;
	}

	/**
	 * Retorna uma instancia de {@link LocalDateTime}
	 * @return {@link LocalDateTime}
	 */
	public LocalDateTime getDateStart() {
		return dateStart;
	}

	/**
	 * Atribui um {@link LocalDateTime}
	 * @param dateStart - {@link LocalDateTime}
	 */
	public void setDateStart(LocalDateTime dateStart) {
		this.dateStart = dateStart;
	}

	/**
	 * Retorna uma instancia de {@link LocalDateTime}
	 * @return {@link LocalDateTime}
	 */
	public LocalDateTime getDateEnd() {
		return dateEnd;
	}

	/**
	 * Atribui um {@link LocalDateTime}
	 * @param dateEnd - {@link LocalDateTime}
	 */
	public void setDateEnd(LocalDateTime dateEnd) {
		this.dateEnd = dateEnd;
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
	 * Retorna uma instancia de {@link SubscriptionEntity}
	 * @return {@link SubscriptionEntity}
	 */
	public EventEntity getEvent() {
		return event;
	}

	/**
	 * Atribui um {@link SubscriptionEntity}
	 * @param event - {@link SubscriptionEntity}
	 */
	public void setEvent(EventEntity event) {
		this.event = event;
	}
}