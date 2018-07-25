package pe.edu.unmsm.fisi.siscae.utilitario;

import java.util.List;
import java.util.NoSuchElementException;

public class CollectionUtil
{

    public static <T> T obtenerUnicoElemento(List<T> lista) throws NoSuchElementException
    {
        return lista.stream().findFirst().get();
    }

}
