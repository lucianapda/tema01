package sape.server.model.base;

import java.time.LocalDateTime;

/**
 * Base para implementações livres de definições jpa.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public abstract class BaseDTO {

	private Long id;
	private LocalDateTime version;

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
	 * Retorna uma instancia de {@link LocalDateTime}
	 * @return {@link LocalDateTime}
	 */
	public LocalDateTime getVersion() {
		return version;
	}

	/**
	 * Atribui um {@link LocalDateTime}
	 * @param version - {@link LocalDateTime}
	 */
	public void setVersion(LocalDateTime version) {
		this.version = version;
	}
}