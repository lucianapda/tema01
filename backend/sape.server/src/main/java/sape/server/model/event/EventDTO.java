package sape.server.model.event;

import java.time.LocalDate;
import java.util.ArrayList;

import sape.server.model.base.BaseDTO;
import sape.server.model.event.activity.EventActivityDTO;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Representa um {@link SubscriptionActivityEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class EventDTO extends BaseDTO {

	private Long code;
	private String place;
	private String description;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private LocalDate dateStartSubscription;
    private LocalDate dateEndSubscription;
	private Integer vacancy;
	private Boolean waitingList;
	private Long idUser;
	private ArrayList<EventActivityDTO> activities = new ArrayList<>();

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
	 * Retorna uma instancia de {@link Long}
	 * @return {@link Long}
	 */
	public Long getIdUser() {
		return idUser;
	}

	/**
	 * Atribui um {@link Long}
	 * @param idUser - {@link Long}
	 */
	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	/**
	 * Retorna uma instancia de {@link ArrayList<EventActivityDTO>}
	 * @return {@link ArrayList<EventActivityDTO>}
	 */
	public ArrayList<EventActivityDTO> getActivities() {
		return activities;
	}

	/**
	 * Atribui um {@link ArrayList<EventActivityDTO>}
	 * @param activities - {@link ArrayList<EventActivityDTO>}
	 */
	public void setActivities(ArrayList<EventActivityDTO> activities) {
		this.activities = activities;
	}
}