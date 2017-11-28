package sape.server.model.subscription;

import java.time.LocalDate;
import java.util.ArrayList;

import sape.server.model.base.BaseDTO;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Representa um {@link SubscriptionActivityEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class SubscriptionDTO extends BaseDTO {

	private Long code;
    private LocalDate date;
    private Long idPerson;
    private String namePerson;
    private ArrayList<Long> activities = new ArrayList<>();

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
	 * Retorna uma instancia de {@link Long}
	 * @return {@link Long}
	 */
	public Long getIdPerson() {
		return idPerson;
	}

	/**
	 * Atribui um {@link Long}
	 * @param idPerson - {@link Long}
	 */
	public void setIdPerson(Long idPerson) {
		this.idPerson = idPerson;
	}

	/**
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getNamePerson() {
		return namePerson;
	}

	/**
	 * Atribui um {@link String}
	 * @param namePerson - {@link String}
	 */
	public void setNamePerson(String namePerson) {
		this.namePerson = namePerson;
	}

	/**
	 * Retorna uma instancia de {@link ArrayList<Long>}
	 * @return {@link ArrayList<Long>}
	 */
	public ArrayList<Long> getActivities() {
		return activities;
	}

	/**
	 * Atribui um {@link ArrayList<Long>}
	 * @param activities - {@link ArrayList<Long>}
	 */
	public void setActivities(ArrayList<Long> activities) {
		this.activities = activities;
	}
}