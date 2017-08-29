package sape.server.model.base;

import java.sql.Timestamp;

/**
 * Base para implementações livres de definições jpa.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public abstract class BaseDTO {

	private Long id;
	private Timestamp version;

	/**
	 * Retorna uma instancia de {@link Long}
	 * @return {@link Long}
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Atribui um {@link Long}
	 * @param id - {@link Long}
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Retorna uma instancia de {@link Timestamp}
	 * @return {@link Timestamp}
	 */
	public Timestamp getVersion() {
		return version;
	}

	/**
	 * Atribui um {@link Timestamp}
	 * @param version - {@link Timestamp}
	 */
	public void setVersion(Timestamp version) {
		this.version = version;
	}
}