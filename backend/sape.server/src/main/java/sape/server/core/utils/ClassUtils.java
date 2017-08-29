package sape.server.core.utils;

import java.lang.reflect.Constructor;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import org.apache.commons.lang3.StringUtils;

/**
 * Classe que define método para manipulação de <code>class</code>
 *
 * @autor Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class ClassUtils extends org.apache.commons.lang3.ClassUtils {

	/**
	 * Retorna se a clazz possui o mesmo name
	 * @param clazz - {@link Class}
	 * @param name - {@link String}
	 */
	public static boolean toName(Class<?> clazz, String name){
		return clazz == null ? false : StringUtils.equals(clazz.getName(), name);
	}

	/**
	 * Efetua um cast de <code>value</code> para <code>type</code>
	 * @param type - {@link Class} - T
	 * @param value - {@link Object}
	 * @return value instancia de T
	 */
	@SuppressWarnings("unchecked")
	public static <T> T toAssignable(Class<T> type, Object value){
		if(value != null && isAssignable(value.getClass(), type)){
			return (T) value;
		}
		return null;
	}

	/**
	 * Efetua um cast de <code>value</code> para <code>type</code><br/>
	 * Procura o <code>type</code> na hierarquia das classes de <code>value</code>
	 * @param <N>
	 * @param type - {@link Class} - T
	 * @param value - {@link Object}
	 * @return value instancia de T
	 */
	public static <T, N> N toAssignableFrom(Class<N> type, T value){
		Class<N> assignableClassFrom = toAssignableClassFrom(type, value.getClass());
		if(assignableClassFrom != null){
			try {
				return assignableClassFrom.newInstance();
			} catch (InstantiationException | IllegalAccessException e) {
				System.err.println("Erro ao efetuar o cast.");
				e.printStackTrace();
			}
		}
		return null;
	}



    /**
	 * Efetua um cast de <code>value</code> para <code>type</code><br/>
	 * Procura o <code>type</code> na hierarquia das classes de <code>value</code>
	 * @param type - {@link Class} - T
	 * @param value - {@link Object}
	 * @return o class de T
	 */
	@SuppressWarnings("unchecked")
	public static <T> Class<T> toAssignableClassFrom(Class<T> type, Class<?> value){
		if(type.getClass().isAssignableFrom(value.getClass())){
			return (Class<T>) value;
		}
		return null;
	}

	/**
	 * Retorna se o <code>value</code> é do do mesmo <code>type</code>
	 * @param type - {@link Class}
	 * @param value - {@link Object}
	 * @return {@link Boolean}
	 */
	public static boolean isToAssignable(Class<?> type, Object value){
		return toAssignable(type, value) != null;
	}

	/**
	 * Verifica se o nome da classe contida em <code>className</code> é o mesmo nome do <code>original.class</code>.
	 * @param original - informa o classe a ser comparada
	 * @param className - informa o nome da classe a ser comparada.
	 * @return uma instancia de {@link Boolean}.
	 */
    public static boolean isSameClassName(Class<?> original, String className){
    	return original != null && original.getName().equals(className);
    }

    /**
     * Retorna uma nova instância do {@link Class}.<br />
     * A {@link Class} deve conter um construtor padrão sem nenhum parametro.<br />
     * <br />- <b>Data:</b> 16 de ago de 2015
     * @param <T> - {@link Class}
     */
    public static <T> T getNewInstance(Class<T> classNewInstance){
    	if (classNewInstance == null) {
			return null;
		}
    	Constructor<?>[] constructors = classNewInstance.getConstructors();
    	for (Constructor<?> constructor : constructors) {
			int parameterCount = constructor.getParameterCount();
			if (parameterCount == 0) {
				return newInstance(classNewInstance);
			}
		}
    	System.err.println("Nenhum construtor padrão sem parametros foi encontrado para o class: " + classNewInstance.getName());
    	return null;
    }

	/**
	 * Cria uma nova instância do <code>classNewInstance</code>.
	 * <br />- <b>Data de criação:</b> 16 de ago de 2015
	 * @param <T>
	 * @return um {@link T}
	 */
	private static <T> T newInstance(Class<T> classNewInstance) {
		try {
			return classNewInstance.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			System.err.println("Erro ao instanciar o objeto.");
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Recupera o tipo genérico da class que contem os tipos genéricos.
	 * @param classWithGeneric - A classe que tem definição de generics
	 * @param classGenericExpected - A classe esperado do genericos, necessário para identificar qual tipo genérico.
	 * @param <T> - O tipo que tem definição de generics
	 * @param <G> - O tipo esperado do genericos, necessário para identificar qual tipo genérico.
	 * @return um {@link Class} que estende de <code>classGenericExpected</code>
	 */
	public static <T, G> Class<? extends G> getGenericType(Class<T> classWithGeneric, Class<G> classGenericExpected){
		Type[] actualTypeArguments = ((ParameterizedType) classWithGeneric.getGenericSuperclass()).getActualTypeArguments();
		for (Type type : actualTypeArguments) {
			Class<?> classForName = null;
			try {
				classForName = Class.forName(type.getTypeName());
				Class<G> assignableClassFrom = ClassUtils.toAssignableClassFrom(classGenericExpected, classForName);
				if (assignableClassFrom != null) {
					return assignableClassFrom;
				}
			} catch (ClassNotFoundException e) {
				System.err.println();
				e.printStackTrace();
			}
		}
		return null;
	}
}