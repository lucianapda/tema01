package sape.server.model.subscription;

import java.time.LocalDate;

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
}