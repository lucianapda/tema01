package sape.server.model.event.activity;

import java.time.LocalDateTime;

import sape.server.model.base.BaseDTO;

/**
 * Representa um {@link EventActivityEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class EventActivityDTO extends BaseDTO {

	private Long code;
	private String description;
	private String speaker;
	private String theme;
    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;
	private Integer vacancy;
	private String place;
    private Long idEvent;

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
	 * Retorna uma instancia de {@link Long}
	 * @return {@link Long}
	 */
	public Long getIdEvent() {
		return idEvent;
	}

	/**
	 * Atribui um {@link Long}
	 * @param idEvent - {@link Long}
	 */
	public void setIdEvent(Long idEvent) {
		this.idEvent = idEvent;
	}
}