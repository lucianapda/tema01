package sape.server.model.userfunction;

import sape.server.model.base.BaseDTO;

/**
 * Representa um {@link UserFunctionEntity}.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class UserFunctionDTO extends BaseDTO {

    private Long code;
    private String name;

    /**
     * Retorna o code - {@link Long}
     * @return {@link Long}
     */
    public Long getCode() {
        return code;
    }

    /**
     * Atribui ao code - {@link Long}
     * @param code - {@link Long}
     */
    public void setCode(Long code) {
        this.code = code;
    }

    /**
     * Retorna o name - {@link String}
     * @return {@link String}
     */
    public String getName() {
        return name;
    }

    /**
     * Atribui ao name - {@link String}
     * @param name - {@link String}
     */
    public void setName(String name) {
        this.name = name;
    }
}