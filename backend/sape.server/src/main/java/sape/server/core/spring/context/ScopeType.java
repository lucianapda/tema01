package sape.server.core.spring.context;

import org.springframework.context.annotation.Scope;

/**
 * Define os tipos da anotaçao @{@link Scope}
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public final class ScopeType {
    public static final String SINGLETON = "singleton";
    public static final String PROTOTYPE = "prototype";
}