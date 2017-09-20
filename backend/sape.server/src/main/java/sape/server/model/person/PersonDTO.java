package sape.server.model.person;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import sape.server.model.base.BaseDTO;
import sape.server.model.person.contact.PersonContactDTO;

/**
 * Representa um {@link PersonEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class PersonDTO extends BaseDTO {

	private Long code;
	private String name;
    private LocalDate birthDate;
	private String cpf;
	private ArrayList<PersonContactDTO> contacts = new ArrayList<>();

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
	 * Retorna uma instancia de {@link LocalDate}
	 * @return {@link LocalDate}
	 */
	public LocalDate getBirthDate() {
		return birthDate;
	}

	/**
	 * Atribui um {@link LocalDate}
	 * @param birthDate - {@link LocalDate}
	 */
	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
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
	 * Retorna uma instancia de {@link List<PersonContactDTO>}
	 * @return {@link List<PersonContactDTO>}
	 */
	public List<PersonContactDTO> getContacts() {
		return contacts;
	}

	/**
	 * Atribui um {@link List<PersonContactDTO>}
	 * @param contacts - {@link List<PersonContactDTO>}
	 */
	public void setContacts(ArrayList<PersonContactDTO> contacts) {
		this.contacts = contacts;
	}
}