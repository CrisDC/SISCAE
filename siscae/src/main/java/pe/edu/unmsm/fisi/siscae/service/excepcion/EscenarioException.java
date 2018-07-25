package pe.edu.unmsm.fisi.siscae.service.excepcion;

public class EscenarioException extends RuntimeException
{
    private static final long serialVersionUID = 1L;

    public EscenarioException(String mensaje)
    {
        super(mensaje);
    }
}
