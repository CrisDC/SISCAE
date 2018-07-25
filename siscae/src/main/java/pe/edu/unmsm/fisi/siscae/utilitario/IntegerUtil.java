package pe.edu.unmsm.fisi.siscae.utilitario;

public class IntegerUtil
{
    public static Integer aEntero(String cadena){
        Integer numero = null;
        try
        {
            numero = Integer.parseInt(cadena);
        } catch (NumberFormatException ex)
        {
           return null;
        }
        return numero; 
    }
}
