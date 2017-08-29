package sape.server.core.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Define métodos para manipulação de {@link String}
 *
 * @autor Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public class StringUtils extends org.apache.commons.lang3.StringUtils{

    /**
     * <p>Checks if the String contains only unicode digits or dot
     * (<code>'.'</code>).
     *
     * <pre>
     * StringUtils.isNumeric(null)   = false
     * StringUtils.isNumeric("")     = false
     * StringUtils.isNumeric("  ")   = false
     * StringUtils.isNumeric("123")  = true
     * StringUtils.isNumeric("12 3") = false
     * StringUtils.isNumeric("ab2c") = false
     * StringUtils.isNumeric("12-3") = false
     * StringUtils.isNumeric("12.3") = true
     * </pre>
     *
     * @param str  the String to check, may be null
     * @return <code>true</code> if only contains digits or space,
     *  and is non-null
     */
    public static boolean isNumericDot(String str) {
        if (str == null || str.trim().length() == 0) {
            return false;
        }
        int sz = str.length();
        for (int i = 0; i < sz; i++) {
            if ((Character.isDigit(str.charAt(i)) == false) && (str.charAt(i) != '.')) {
                return false;
            }
        }
        return true;
    }

	/**
	 * Faz a comparação dos caracteres e define quem vem primeiro.
	 * @param a - informe o primeiro valor.
	 * @param b - informe o segundo valor.
	 * @see {@link String#compareTo(String)}.
	 */
	public static int compareTo(String a, String b){
		if(a != null) {
			return a.compareTo(b);
		}
		return 0;
	}

	/**
	 * Faz a comparaÃ§Ã£o dos caracteres e define quem vem primeiro.
	 * @param a - informe o primeiro valor.
	 * @param b - informe o segundo valor.
	 * @see {@link String#compareToIgnoreCase(String)}.
	 */
	public static int compareToIgnoreCase(String a, String b){
		if(a != null) {
			return a.compareToIgnoreCase(b);
		}

		return 0;
	}

	/**
	 * Replaces every subsequence of the input sequence that matches the
     * pattern with the given replacement string.
	 * @param regex - the expression to be compiled.
	 * @param input - the character sequence to be matched.
	 * @param replacement - the replacement string.
	 * @return The string constructed by replacing each matching subsequence
     *          by the replacement string, substituting captured subsequences
     *          as needed
	 */
	public static String replaceAll(String regex, String input, String replacement){
		if(input == null) {
			return null;
		}

		// procura por quebras de linhas
		Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);

        // se encontrou remove-as
        if (matcher.find()) {
			return matcher.replaceAll(replacement);
		}

        return input;
	}

	/**
	 * Disponibiliza uma string vazia com o tamanho requisitado.
	 * @param length - informa o tamanho da string.
	 * @return a nova string.
	 */
    public static String createSpacer(int length) {
    	if (length <= 0) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        while(sb.length() < length) {
            sb.append(" ");
        }

        return sb.toString();
    }

	/**
	 * Retorna uma nova string com todos os espaços em torno removidos e os espaços
	 * internos normalizados em um único espaço. Se existe espaço em branco, a string
	 * vazia é retornada.
	 *
	 * @param str - informa a string a ser normalizada.
	 * @return normalized string or empty string
	 */
	public static String normalizeString(String str) {
		if (str == null) {
			return " ";
		}

		char[] c = str.toCharArray();
		char[] n = new char[c.length];
		boolean white = true;
		int pos = 0;
		for (int i = 0; i < c.length; i++) {
			if (" \t\n\r".indexOf(c[i]) != -1) {
				if (!white) {
					n[pos++] = ' ';
					white = true;
				}
			} else {
				n[pos++] = c[i];
				white = false;
			}
		}
		if (white && pos > 0) {
			pos--;
		}
		return new String(n, 0, pos);
	}

	/**
	 * Retorna uma string com todos os <b>values</b> separados pelo <b>separador</b>
	 * @param separador - {@link String}
	 * @param values - array de {@link Object}
	 * @return {@link String}
	 */
	public static String toSeparatorString(String separador, Object... values){
		StringBuilder sb = new StringBuilder();

		if(values != null && values.length > 0){
			for (int i = 0; i < values.length; i++) {
				Object strAux = values[i];
				if(strAux != null) {
					sb.append(strAux);
					if(separador != null && i != values.length -1){
						sb.append(separador);
					}
				}
			}
		}
		return sb.toString();
	}
}