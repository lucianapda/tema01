package sape.server.core.utils;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import java.util.Base64;

/**
 * Classe utilitária para criptografia.
 * 
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
public final class EncryptionUtil {
	
	private static final String MD5 = "MD5";
	
	private static final String SHA_256 = "SHA-256";
	
	private static final String AES = "AES";
	
	private static final byte[] AES_KEY = "e-manager secret".getBytes();

	private static final byte[] AES_IV = { 0x43, (byte) 0x6d, 0x22, (byte) 0x9a,
                                           0x22, (byte) 0xf8, (byte) 0xcf, (byte) 0xfe, 0x15, 0x21,
                                           (byte) 0x0b, 0x38, 0x01, (byte) 0xa7, (byte) 0xfc, 0x0e };

	/**
	 * Retorna uma o valor codificado utilizando um algoritmo de criptografia
	 * sem volta.
	 *
	 * @param value - o valor a ser codificado.
	 * @return o valor codificado.
	 * @throws Exception
	 */
	public static String encodeMD5(char[] value) throws Exception {
		return encodeMD5(new String(value));
	}

	/**
	 * Retorna uma o valor codificado utilizando um algoritmo de criptografia
	 * sem volta.
	 *
	 * @param value - o valor a ser codificado.
	 * @return o valor codificado.
	 * @throws Exception
	 */
	public static String encodeMD5(String value) throws Exception {
		return encode(value, MD5);
	}

	/**
	 * Retorna uma o valor codificado utilizando um algoritmo de criptografia
	 * sem volta.
	 *
	 * @param value - o valor a ser codificado.
	 * @return o valor codificado.
	 * @throws Exception
	 */
	public static String encodeSHA256(byte[] value) throws Exception {
		return encode(value, SHA_256);
	}

	/**
	 * Retorna uma o valor codificado utilizando um algoritmo de criptografia
	 * sem volta.
	 *
	 * @param value - o valor a ser codificado.
	 * @param digest - a chave de criptografia
	 * @return o valor codificado.
	 * @throws Exception
	 */
	public static String encode(String value, String digest) throws Exception {
		return encode(value.getBytes(), digest);
	}

	/**
	 * Retorna uma o valor codificado utilizando um algoritmo de criptografia
	 * sem volta.
	 *
	 * @param value - o valor a ser codificado.
	 * @param digest - a chave de criptografia
	 * @return o valor codificado.
	 * @throws Exception
	 */
	public static String encode(byte[] value, String digest) throws Exception {
		// Obtém uma instância do algoritmo MD5.
		MessageDigest algorithm = MessageDigest.getInstance(digest);
		// reinicia o algoritmo
		algorithm.reset();
		// Obtém os bytes codificados.
		algorithm.update(value);
		// Gerando o hash e codigicando para hexadecimal
		byte messageDigest[] = algorithm.digest();
		StringBuilder hexString = new StringBuilder();
		for (int i = 0; i < messageDigest.length; i++) {
			String hex = Integer.toHexString(0xFF & messageDigest[i]);
			if (hex.length() == 1) {
				hexString.append('0');
			}
			hexString.append(hex);
		}
		return hexString.toString();
	}

	/**
	 * Retorna um valor codificado em Base64.
	 *
	 * @param bytes - valor a ser codificado
	 * @return Valor codificado
	 */
	public static String encode64(byte[] bytes) {
		return Base64.getEncoder().encodeToString(bytes);
	}

	/**
	 * Retorna o valor original de um valor codificado
	 * em Base64.
	 *
	 * @param value - Valor codificado
	 * @return Valor original
	 */
	public static byte[] decode64(String value) {
		return Base64.getDecoder().decode(value);
	}

	/**
	 * Retorna o valor da string codificado em Base64.
	 *
	 * Este método irá sempre converter a string para a codificação UTF-8
	 *
	 * @param str - valor a ser codificado
	 * @return Valor codificado
	 */
	public static String stringCrypt64(String str) {
		return Base64.getEncoder().encodeToString(str.getBytes());
	}

	/**
	 * Retorna o valor original de uma valor string codificado
	 * em Base64.
	 *
	 * Este método irá sempre retornar a string com a codificação UTF-8
	 *
	 * @param value - Valor codificado
	 * @return Valor original
	 */
	public static String stringDecrypt64(String value) {
		return new String(Base64.getDecoder().decode(value));
	}

	/**
	 * Retorna um valor codificado em AES.
	 * @param value - valor a ser codificado
	 * @return
	 * @throws Exception
	 */
	public static String cryptAES(char[] value) throws Exception {
		return cryptAES(new String(value));
	}

	/**
	 * Retorna um valor codificado em AES.
	 * @param value - valor a ser codificado
	 * @return
	 * @throws Exception
	 */
	public static String cryptAES(String value) throws Exception {
		try {
			SecretKeySpec skeySpec = new SecretKeySpec(AES_KEY, AES);
			IvParameterSpec ips = new IvParameterSpec(AES_IV);

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, skeySpec, ips);
			byte[] encrypted = cipher.doFinal(value.getBytes());

			return encode64(encrypted);
		}
		catch (Exception e) {
			throw new Exception("Erro ao criptografar informações " + e.getMessage());
		}
	}

	/**
	 * Retorna o valor original de um valor codificado em AES.
	 * @param encrypted - valor a ser decodificado
	 * @return
	 * @throws Exception
	 */
	public static String decryptAES(String encrypted) throws Exception {

		byte[] decrypted = null;

		try {

			SecretKeySpec skeySpec = new SecretKeySpec(AES_KEY, AES);
			IvParameterSpec ips = new IvParameterSpec(AES_IV);

			byte[] decoded = decode64(encrypted);

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, skeySpec, ips);
			decrypted = cipher.doFinal(decoded);
		}
		catch (Exception e) {
			throw new Exception("Erro ao descriptografar informações " + e.getMessage());
		}

		return new String(decrypted);
	}
}