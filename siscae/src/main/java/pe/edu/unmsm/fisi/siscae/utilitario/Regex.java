package pe.edu.unmsm.fisi.siscae.utilitario;

public class Regex
{
    public static final String SOLO_DIGITOS = "\\d+";
    public static final String SOLO_DIGITOS_O_VACIO = "^$|\\d+";
    public static final String FORMATO_HHMMSS = "^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$";
    public static final String SOLO_LETRAS_A_a = "^[A-Za-z]+$";
    public static final String SEGURIDAD_PASS = "^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{1,}$";

    public static final String ALFANUMERICO = "^[A-Za-z0-9]+$";
    public static final String VACIO_O_ALFANUMERICO = "^$|^[A-Za-z0-9]+$";
    public static final String ALFANUMERICO_O_ESPACIO_BLANCO = "^$|^[A-Za-z0-9\\s]+$";
    public static final String SEGURIDAD = "^(?=(?:.*\\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\\$";

    public static final String SOLO_1_o_0 = "0|1";
    public static final String VACIO_O_NO_SOLO_ESPACIOS_EN_BLANCO = "^$|^(?=.*\\s).+$";
    public static final String NO_ESPACIOS_EN_BLANCO = "^\\S+$";
    public static final String ESPACIOS_EN_BLANCO = "\\s+";

}