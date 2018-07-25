package pe.edu.unmsm.fisi.siscae.service.excepcion;

public class ListaVaciaException extends RuntimeException
{
    private static final long serialVersionUID = 1L;

    public ListaVaciaException(String mensaje)
    {
        super(mensaje);
    }
}
