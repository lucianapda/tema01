package sape.server.crud.base;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import sape.server.core.exception.error.ValidationError;

/**
 * Define uma reposta do servidor pro cliente, permite enviar assim uma lista de erros junto com a resposta.
 *
 * @autor Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class ResponseCRUD<T extends Comparable<?>> extends ResponseEntity<T> {

	private List<ValidationError> errors = new ArrayList<>();

	/**
	 * Construtor de ResponseCRUD
	 * @param status
	 */
	public ResponseCRUD(HttpStatus status) {
		super(status);
	}

	/**
	 * Construtor de ResponseCRUD
	 * @param status
	 */
	public ResponseCRUD(HttpStatus status, List<ValidationError> errors) {
		super(status);
		this.errors = errors;
	}

	/**
	 * Retorna uma instancia de {@link List<ValidationError>}
	 * @return {@link List<ValidationError>}
	 */
	public List<ValidationError> getErrors() {
		return errors;
	}
}
