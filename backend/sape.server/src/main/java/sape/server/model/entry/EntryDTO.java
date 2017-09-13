package sape.server.model.entry;

import java.time.LocalDateTime;

import sape.server.model.base.BaseDTO;
import sape.server.model.subscription.activity.SubscriptionActivityEntity;

/**
 * Representa um {@link SubscriptionActivityEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class EntryDTO extends BaseDTO {

	private Long code;
	private LocalDateTime dateEntry;
    private LocalDateTime dateDeparture;
    private Long idSubscriptionActivity;

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
	 * Retorna uma instancia de {@link Long}
	 * @return {@link Long}
	 */
	public Long getIdSubscriptionActivity() {
		return idSubscriptionActivity;
	}

	/**
	 * Atribui um {@link Long}
	 * @param idSubscriptionActivity - {@link Long}
	 */
	public void setIdSubscriptionActivity(Long idSubscriptionActivity) {
		this.idSubscriptionActivity = idSubscriptionActivity;
	}
}