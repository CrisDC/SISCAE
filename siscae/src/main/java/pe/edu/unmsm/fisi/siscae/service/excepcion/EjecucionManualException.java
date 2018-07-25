package pe.edu.unmsm.fisi.siscae.service.excepcion;

public class EjecucionManualException extends RuntimeException
{
    private static final long serialVersionUID = 1L;

    public EjecucionManualException(String mensaje)
    {
        super(mensaje);
    }
}
