package sape.server.model.base;

import java.time.LocalDateTime;

import javax.persistence.MappedSuperclass;
import javax.persistence.Version;

/**
 * Entidade básica para a implementação de uma entidade.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@MappedSuperclass
public abstract class BaseEntity {

    public static final String VERSION = "version";

    @Version
	private LocalDateTime version;

	/**
	 * Retorna um {@link LocalDateTime} - (version)
	 * @return {@link LocalDateTime}
	 */
	public final LocalDateTime getVersion() {
        return version;
	}

	/**
	 * Atribui um {@link LocalDateTime} para (version).
	 * @param version - {@link LocalDateTime}
	 */
	public final void setVersion(LocalDateTime version) {
        this.version = version;
	}

	/**
	 * Retorna uma instancia de {@link Long}
	 * @return {@link Long}
	 */
	public abstract Long getId();

	/**
	 * Atribui um {@link Long}
	 * @param id - {@link Long}
	 */
	public abstract void setId(Long id);
}