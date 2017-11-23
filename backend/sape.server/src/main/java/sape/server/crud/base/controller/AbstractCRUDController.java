package sape.server.crud.base.controller;

import java.io.Serializable;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import sape.server.core.exception.ValidationException;
import sape.server.crud.base.service.AbstractCRUDService;
import sape.server.model.base.BaseDTO;
import sape.server.model.base.BaseEntity;

/**
 * Define um padrão de implementação dos controladores
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 *
 * @param <O> - Implementação de {@link BaseDTO}
 * @param <E> - Implementação de {@link BaseEntity}
 */
public abstract class AbstractCRUDController<O extends BaseDTO, E extends BaseEntity> {

    /**
     * Disponibiliza uma forma de salvar entidade.
     * @param dto - {@link BaseDTO}
     * @return {@link ResponseEntity}
     */
    @PostMapping
    public @ResponseBody ResponseEntity<Object> create(@RequestBody O dto) {
        AbstractCRUDService<E, O> service = getService();
        if (dto != null) {
            E entityNew = service.createEmptyEntity();
            try {
                entityNew = service.convertToEntity(dto, entityNew);
                E entityCreated = service.save(entityNew);
                return ResponseEntity.ok(service.convertToDTO(entityCreated, getService().createEmptyDTO()));
            } catch(ValidationException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error");
    }

//    /**
//     * Disponibiliza uma forma de salvar entidade.
//     * @param dto - {@link BaseDTO}
//     * @return {@link ResponseEntity}
//     */
//    @PostMapping
//    public @ResponseBody ResponseEntity<Object> createAll(@RequestBody O[] dtos) {
//    	AbstractCRUDService<E, O> service = getService();
//        if (dtos != null) {
//        	List<E> entities = new ArrayList<>();
//        	for (O dto : dtos) {
//        		E entityNew = service.createEmptyEntity();
//        		entityNew = service.convertToEntity(dto, entityNew);
//				entities.add(entityNew);
//			}
//            try {
//            	List<O> dtosSaved = new ArrayList<>();
//                for (E e : service.saveAll(entities)) {
//                	dtosSaved.add(service.convertToDTO(e, getService().createEmptyDTO()));
//				}
//                return ResponseEntity.ok(dtosSaved);
//            } catch(ValidationException e) {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
//            }
//        }
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error");
//
//    }

    /**
     * Disponibiliza uma forma de atualizar a entidade.
     * @param dto - {@link BaseDTO}
     * @return {@link ResponseEntity}
     */
    @PutMapping
    public @ResponseBody ResponseEntity<Object> update(@RequestBody O dto) {
        AbstractCRUDService<E, O> service = getService();
        if (dto != null && dto.getId() != null) {
            try {
                return ResponseEntity.ok(service.save(dto));
            } catch (ValidationException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error");
    }

//    /**
//     * Disponibiliza uma forma de salvar entidade.
//     * @param dto - {@link BaseDTO}
//     * @return {@link ResponseEntity}
//     */
//    @PostMapping
//    public @ResponseBody ResponseEntity<Object> updateAll(@RequestBody O[] dtos) {
//    	AbstractCRUDService<E, O> service = getService();
//        if (dtos != null) {
//        	List<E> entities = new ArrayList<>();
//        	for (O dto : dtos) {
//        		E entityNew = service.getEntity(dto.getId());;
//        		entityNew = service.convertToEntity(dto, entityNew);
//				entities.add(entityNew);
//			}
//            try {
//            	List<O> dtosSaved = new ArrayList<>();
//                for (E e : service.saveAll(entities)) {
//                	dtosSaved.add(service.convertToDTO(e, getService().createEmptyDTO()));
//				}
//                return ResponseEntity.ok(dtosSaved);
//            } catch(ValidationException e) {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
//            }
//        }
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error");
//    }

    /**
     * Disponibiliza uma forma de exclusao da entidade.
     * @param id - {@link Long}
     * @return {@link ResponseEntity}
     */
    @DeleteMapping(params={"id"})
    public @ResponseBody ResponseEntity<Serializable> deleteById(@RequestParam("id") Long id) {
        AbstractCRUDService<E, O> service = getService();
        if (id != null) {
            try {
                service.deleteById(id);
                return ResponseEntity.ok(id);
            } catch (ValidationException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error");
    }

    /**
     * Disponibiliza uma forma de leitura da entidade a partir do id.
     * @param id - {@link Long}
     * @return {@link ResponseEntity}
     */
    @GetMapping(path={"/{id}"})
    public @ResponseBody ResponseEntity<?> read(@PathVariable("id") Long id){
        return ResponseEntity.ok(getService().getDTO(id));
    }

    /**
     * Disponibiliza uma forma para recuperar todas as entidades.
     * @return {@link ResponseEntity}
     * @throws ValidationException
     */
    @GetMapping
    public @ResponseBody ResponseEntity<?> read(@RequestParam(name = "filters", required = false ) List<String> filters,
    											@RequestParam(name = "sort", required = false) List<String> sort,
    											@RequestParam(name = "fields", required = false) List<String> fields,
    											@RequestParam(name = "query", required = false) String query,
    											@RequestParam(name = "page", required = false) Integer page,
    											@RequestParam(name = "per_page", required = false) Integer per_page) throws ValidationException{
    	if ((filters == null || filters.isEmpty()) &&
			(sort == null || sort.isEmpty()) &&
			(fields == null || fields.isEmpty()) &&
			(query == null || query.isEmpty()) &&
			page == null &&
			per_page == null) {
    		return ResponseEntity.ok(getService().getDTOs());
		}
        return ResponseEntity.ok(getService().getDTOs(filters, sort, fields, query, page, per_page));
    }

    /**
     * Serviço de persistencia de {@link E}
     * @return {@link AbstractCRUDService} of {@link E}
     */
    protected abstract AbstractCRUDService<E, O> getService();
}