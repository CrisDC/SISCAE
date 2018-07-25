package utilTest;

import static pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales.PREFIJO_ARCHIVO;
import static pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales.SUFIJO_ARCHIVO;

import org.junit.Test;

public class PrefijoSufijoTest
{
    @Test
    public void test()
    {
        String archivo = "[INST]LOGCNT.dat";
        System.out.println(removePrefijoSufijoArchivo(archivo));
    }

    private String removePrefijoSufijoArchivo(String archivo)
    {
        System.out.println(archivo.substring(PREFIJO_ARCHIVO.length(), archivo.length()));
        System.out.println(archivo.substring(0, archivo.length() - SUFIJO_ARCHIVO.length()));
        String archivoSinPrefijo = archivo.substring(PREFIJO_ARCHIVO.length(), archivo.length());
        return archivoSinPrefijo.substring(0, archivoSinPrefijo.length() - SUFIJO_ARCHIVO.length());
    }
}