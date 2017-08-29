package sape.server.model.person.contact;

import sape.server.model.base.BaseDTO;

/**
 * Representa um {@link PersonContactEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class PersonContactDTO extends BaseDTO {

	private Long code;
	private String description;
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