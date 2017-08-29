package sape.server.model.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import sape.server.model.base.BaseEntity;
import sape.server.model.userfunction.UserFunctionEntity;

/**
 * Representa um usuário no sistema.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Entity
@Table(name = "usuario_externo")
public class UserEntity extends BaseEntity {

	public static final String CODE = "code";
	public static final String CPF = "cpf";
    public static final String NAME = "name";
    public static final String EMAIL = "email";
    public static final String SITUATION = "situation";
    public static final String ACESS_PROFILE = "acessProfile";
    public static final String USER_FUNCTION = "userFunction";
    public static final String PHONE = "phone";

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_usuario", nullable = false)
	private Long id;

	@NotNull
	@Column(nullable = false, name = "co_usuario")
	private Long code;

	@NotNull
	@Column(nullable = false, name = "nu_cpf", length=11, unique=true)
	private String cpf;

	@NotNull
	@Column(nullable = false, name = "no_usuario", length=60)
	private String name;

	@NotNull
	@Column(nullable = false, name = "de_email", length=255)
	private String email;

	@NotNull
	@Column(nullable = false, name = "ic_situacao", length=1)
	private Byte situation;

	@NotNull
	@Column(nullable = false, name = "ic_perfil_acesso")
	private Integer acessProfile;

	@NotNull
    @ManyToOne(targetEntity = UserFunctionEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name = "FK_eprtb008_eprtb016"), nullable = false, name = "co_funcao")
    private UserFunctionEntity userFunction;

	@NotNull
	@Column(nullable = false, name = "nu_telefone", length=11)
	private String phone;

    /**
     * Retorna o id - {@link Long}
     * @return {@link Long}
     */
    @Override
    public Long getId() {
        return id;
    }

    /**
     * Atribui ao id - {@link Long}
     * @param id - {@link Long}
     */
    @Override
    public void setId(Long id) {
        this.id = id;
    }

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
	public String getCpf() {
		return cpf;
	}

	/**
	 * Atribui um {@link String}
	 * @param cpf - {@link String}
	 */
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	/**
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getName() {
		return name;
	}

	/**
	 * Atribui um {@link String}
	 * @param name - {@link String}
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Atribui um {@link String}
	 * @param email - {@link String}
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Retorna uma instancia de {@link Byte}
	 * @return {@link Byte}
	 */
	public Byte getSituation() {
		return situation;
	}

	/**
	 * Atribui um {@link Byte}
	 * @param situation - {@link Byte}
	 */
	public void setSituation(Byte situation) {
		this.situation = situation;
	}

	/**
	 * Retorna uma instancia de {@link Integer}
	 * @return {@link Integer}
	 */
	public Integer getAcessProfile() {
		return acessProfile;
	}

	/**
	 * Atribui um {@link Integer}
	 * @param acessProfile - {@link Integer}
	 */
	public void setAcessProfile(Integer acessProfile) {
		this.acessProfile = acessProfile;
	}

	/**
	 * Retorna uma instancia de {@link UserFunctionEntity}
	 * @return {@link UserFunctionEntity}
	 */
	public UserFunctionEntity getUserFunction() {
		return userFunction;
	}

	/**
	 * Atribui um {@link UserFunctionEntity}
	 * @param userFunction - {@link UserFunctionEntity}
	 */
	public void setUserFunction(UserFunctionEntity userFunction) {
		this.userFunction = userFunction;
	}

	/**
	 * Retorna uma instancia de {@link String}
	 * @return {@link String}
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * Atribui um {@link String}
	 * @param phone - {@link String}
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
}