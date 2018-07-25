package pe.edu.unmsm.fisi.siscae.service.excepcion;

public class OrdenEjecucionException extends RuntimeException
{
    private static final long serialVersionUID = 1L;

    public OrdenEjecucionException(String mensaje)
    {
        super(mensaje);
    }
}
