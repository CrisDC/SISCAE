package pe.edu.unmsm.fisi.siscae.utilitario;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;

public class DatesUtils
{
    public static final String FORMATO_YYYYMMDD = "YYYY-MM-DD";
    public static final String FORMATO_HHMMSS = "HH:mm:ss";
    
    public static Date obtenerFechaDeMilisegundos(long tiempoMilisegundos)
    {
        DateTime fecha = new DateTime(tiempoMilisegundos);
        return fecha.toDate();
    }
    
    public static String obtenerFechaEnFormato(Date date, String formato) {
        DateTime fecha = new DateTime(date);
        return DateTimeFormat.forPattern(formato).print(fecha);
    }

    public static String obtenerFechaDeMilisegundosEnFormato(long tiempoMilisegundos, String formato)
    {
        DateTime fecha = new DateTime(tiempoMilisegundos);
        return fecha.toString(formato);
    }

    public static LocalTime obtenerLocalTimeHHMMSS(String cadena)
    {
        System.out.println(cadena);
        return LocalTime.of(
                IntegerUtil.aEntero(cadena.substring(0, 2)),
                IntegerUtil.aEntero(cadena.substring(2, 4)),
                IntegerUtil.aEntero(cadena.substring(4, 6)));
        
    }

    public static LocalDate obtenerLocalDateYYYYMMDD(String cadena)
    {
        return LocalDate.of(
                IntegerUtil.aEntero(cadena.substring(0, 4)),
                IntegerUtil.aEntero(cadena.substring(4, 6)),
                IntegerUtil.aEntero(cadena.substring(6, 8)));
    }
    
    
    
 
}
