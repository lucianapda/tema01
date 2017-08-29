package sape.server.model.subscription.activity;

import java.time.LocalDateTime;

import sape.server.model.base.BaseDTO;

/**
 * Representa um {@link SubscriptionActivityEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class SubscriptionActivityDTO extends BaseDTO {

	private Long code;
    private LocalDateTime date;
    private Boolean waitingList;
    private Long idActivity;
    private Long idSubscription;

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
	 * Retorna uma instancia de {@link Long}
	 * @return {@link Long}
	 */
	public Long getIdActivity() {
		return idActivity;
	}

	/**
	 * Atribui um {@link Long}
	 * @param idActivity - {@link Long}
	 */
	public void setIdActivity(Long idActivity) {
		this.idActivity = idActivity;
	}

	/**
	 * Retorna uma instancia de {@link Long}
	 * @return {@link Long}
	 */
	public Long getIdSubscription() {
		return idSubscription;
	}

	/**
	 * Atribui um {@link Long}
	 * @param idSubscription - {@link Long}
	 */
	public void setIdSubscription(Long idSubscription) {
		this.idSubscription = idSubscription;
	}
}