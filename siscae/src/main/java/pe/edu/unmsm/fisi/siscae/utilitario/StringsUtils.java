package pe.edu.unmsm.fisi.siscae.utilitario;

import java.util.Collections;
import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

public class StringsUtils
{
    public static String obtenerCadenaDespuesDePunto(String cadenaConPunto)
    {
        return cadenaConPunto.substring(cadenaConPunto.lastIndexOf('.') + 1);
    }

    public static String concatenarCadena(Object... objetos)
    {
        StringBuffer sb = new StringBuffer();
        for (Object objeto : objetos)
        {
            sb.append(objeto.toString());
        }
        return sb.toString();
    }

    
    public static String[] obtenerSubCadenas(String cadena, String separador) {
		return cadena.split(separador, 2);
	}


    public static List<String> obtenerTokens(String cadena, String separador)
    {
        String cadenaSinEspacios = cadena.replaceAll(Regex.ESPACIOS_EN_BLANCO, "");
        return Collections.list(new StringTokenizer(cadenaSinEspacios, separador)).stream()
                .map(token -> (String) token).collect(Collectors.toList());
    }

    public static String obtenerCadenaDespuesDe(String cadena, String separador)
    {
        if (cadena != null && cadena.length() > 0)
        {
            return cadena.substring(cadena.lastIndexOf(separador) + 1);
        }
        return cadena;
    }

    public static String obtenerCadenaAntesDe(String cadena, String separador)
    {
        if (cadena != null && cadena.length() > 0)
        {
            return cadena.substring(0, cadena.lastIndexOf(separador));
        }
        return cadena;
    }

    public static String removerUltimoCaracter(String cadena)
    {
        if (cadena != null && cadena.length() > 0)
        {
            cadena = cadena.substring(0, cadena.length() - 1);
        }
        return cadena;
    }
    
    public static String concatenar(Object... a){
        String resul = "";
        for (Object el : a) {
            resul = resul + el;
        }   
        return resul;
    }

}
