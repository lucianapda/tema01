export class StringUtils {

  /**
   * Normaliza a string passada como parametro.
   */
  public static normalize(str: string | String) : string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  public static equals(str1: string | String, str2: string | String) {
    return str1.valueOf() == str2.valueOf();
  }

  public static notEquals(str1: string | String, str2: string | String) {
    return !this.equals(str1, str2);
  }
}
