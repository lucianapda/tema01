package sape.server.core.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Member;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

/**
 * Disponibiliza métodos para manipulação dos fields das classes.
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class FieldUtils extends ClassUtils {

	 /**
    * Retorna um array contendo todos os atributos da classe e das superclasses.
    * @param objectClass - informa a classe
    * @return uam instancia de {@link Field[]}.
    */
	public static Field[] getAllFields(Class<?> objectClass) {
		return getFields(objectClass, true);
	}

	/**
    * Retorna os fields da objectClass caso o atributo all for verdadeiro irá retorna de toda a hierarquia da class.
    * @param objectClass - A classe
    * @param all - Informa se deve recuperar os atributos da hierarquia da classe.
    * @return {@link Field}[]
    */
   public static Field[] getFields(Class<?> objectClass, boolean all) {

   	// Lista com todos os campos.
       List<Field> fields = new ArrayList<>();
       // Faz a leitura dos campos.
       Class<?> c = objectClass;

       // Percorre as classes herdadas.
       while (c != null
       		&& !isSameClassName(Object.class, c.getName())) {
           // Adicionada apenas os campos anotados.
           for (Field f : c.getDeclaredFields()) {
               // Adiciona o atributo.
               fields.add(f);
           }

           // Vai para a classe "pai".
           if(all) {
			c = c.getSuperclass();
		} else {
			c = null;
		}
       }

       return fields.toArray(new Field[0]);
   }

   /**
    * Retorna o atributos da classe.
    * @param objectClass - informa a classe
    * @param fieldName - informa o nome do atributo/propriedade.
    * @return uam instancia de {@link Field}.
    */
   public static Field getField(Class<?> objectClass, String fieldName) {
       // Faz a leitura dos campos.
       Class<?> c = objectClass;
       // Percorre as classes herdadas.
       while (c != null
       		&& !isSameClassName(Object.class, c.getName())) {
           // Adicionada apenas os campos anotados.
           for (Field f : c.getDeclaredFields()) {
               // Adiciona o atributo.
               if(f.getName().equals(fieldName)) {
				return f;
			}
           }

           // Vai para a classe "pai".
           c = c.getSuperclass();
       }
       return null;
   }

   /**
    * Verifica se existe a propriedade referenciada na classe.
    * @param property - informa o atributo do bean.
    * @param beanValue - informa a classe que contém o atributo.
    * @return <code>true</code> se encontrar o campo.
    */
   public static boolean isValidField(String property, Class<?> beanValue) {
       return getTreeField(property, beanValue) != null;
   }

   /**
    * Verifica se existe a propriedade referenciada na classe.
    * @param property - informa o atributo do bean.
    * @param beanValue - informa a classe que contém o atributo.
    * @return <code>true</code> se encontrar o campo.
    */
	public static Field getTreeField(String property, Class<?> beanValue) {
		if(StringUtils.isBlank(property) || beanValue == null) {
			return null;
		}

       Class<?> classType = beanValue;
       Field field = null;

       StringTokenizer tokenizer = new StringTokenizer(property, ".");

       if(tokenizer.hasMoreTokens()){
       	do {
       		property = tokenizer.nextToken();
   			field = getField(classType, property);

   			if(field == null) {
				return null;
			}
   			classType = field.getType();
       	}
       	while(tokenizer.hasMoreTokens());
       }
		return field;
	}

   /**
    * Recupera o valor do atributo referenciado no bean.
    * @param property - informa a propriedade do bean.
    * @param beanValue - informa o bean que contém o atributo.
    * @return o valor do atributo contido no bean.
    */
   public static Object getFieldValue(String property, Object beanValue) {

       if(StringUtils.isBlank(property) || beanValue == null) {
		return null;
	}

       Object output      = beanValue;
       Class<?> classType = beanValue.getClass();

       StringTokenizer tokenizer = new StringTokenizer(property, ".");

       if(tokenizer.hasMoreTokens()){
       	do {
       		property = tokenizer.nextToken();
       		output = getFieldValue(getField(classType, property), output);
       		if(output != null) {
				classType = output.getClass();
			}
       	}
       	while(tokenizer.hasMoreTokens());
       }

       return output;
   }

   /**
    * Recupera o valor do atributo referenciado no bean.
    * @param field - informa o atributo a ser recuperado.
    * @param beanValue - informa o bean que contém o atributo.
    * @return o valor do atributo contido no bean.
    */
   public static Object getFieldValue(Field field, Object beanValue){
   	if(field == null || beanValue == null) {
		return null;
	}

		try {
			field.setAccessible(true);
			return field.get(beanValue);
		}
		catch (IllegalArgumentException e) {
			e.printStackTrace();
		}
		catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		finally {
			field.setAccessible(false);
		}
       return null;
   }

   /**
    * Seta o valor no campo field
    * @param field - {@link Field}
    * @param beanValue - O bean
    * @param fieldValue - O valor
    */
   public static void setFieldValue(String field, Object beanValue, Object fieldValue) {
   	if(field == null || beanValue == null) {
		return;
	}

   	Field fieldBean = FieldUtils.getField(beanValue.getClass(), field);

   	setFieldValue(fieldBean, beanValue, fieldValue);
   }

   /**
    * Seta o valor no campo field
    * @param field - {@link Field}
    * @param beanValue - O bean
    * @param fieldValue - O valor
    */
	public static void setFieldValue(Field field, Object beanValue, Object fieldValue) {
		if(field == null || beanValue == null) {
			return;
		}

		if(isStatic(field) || isFinal(field)) {
			return;
		}

		try {
			field.setAccessible(true);
			field.set(beanValue, fieldValue);
		}
		catch (IllegalArgumentException e) {
			e.printStackTrace();
		}
		catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		finally {
			field.setAccessible(false);
		}
	}

	 /**
    * Verifica se o método/campo é estático.
    * @param m - informe o método/campo.
    * @return <code>true</code> se for estático.
    */
   public static boolean isStatic(Member m){
   	return m != null && Modifier.isStatic(m.getModifiers());
   }

   /**
    * Verifica se o método/campo é final.
    * @param m - informe o método/campo.
    * @return <code>true</code> se for final.
    */
   public static boolean isFinal(Member m){
   	return m != null && Modifier.isFinal(m.getModifiers());
   }

   /**
    * Retorna se todos os fields são nulos,
    * @param object - O objeto.
    * @param ignoreFields - Array of {@link String}
    * @return <code>true</code> or <code>false</code>
    */
   public static boolean isAllNullFields(Object object, String... ignoreFields) {
   	if (object != null) {
   		Field[] fields = getFields(object.getClass(), false);
   		for (Field field : fields) {
   			if (!ignoredField(field, ignoreFields)) {
   				Object fieldValue = getFieldValue(field, object);
   				if (fieldValue != null){
   					return false;
   				}
				}
			}
		}
   	return true;
   }

   /**
    * Retorna se os fields informados são nulos.
    * @param object - O objeto.
    * @param fields - Array of {@link String}
    * @return <code>true</code> or <code>false</code>
    */
   public static boolean isNullFields(Object object, String... fields) {
   	if (object != null) {
   		for (String field : fields) {
				if (getFieldValue(field, object) != null) {
					return false;
				}
			}
		}
   	return true;
   }

	/**
	 * Retorna se o field deve ser ignorado.
	 * @param field - {@link Field} o campo.
	 * @param ignoreFields - {@link String}[] os campos que devem ser ignorados.
	 * @return <code>true</code> or <code>false</code>
	 */
	private static boolean ignoredField(Field field, String[] ignoreFields) {
		for (String ignoreField : ignoreFields) {
			if (ignoreField.equalsIgnoreCase(field.getName())) {
				return true;
			}
		}
		return false;
	}
}