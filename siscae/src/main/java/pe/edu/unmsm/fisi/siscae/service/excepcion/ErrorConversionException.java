package pe.edu.unmsm.fisi.siscae.service.excepcion;

public class ErrorConversionException extends RuntimeException
{
    private static final long serialVersionUID = 1L;

    public ErrorConversionException(String mensaje)
    {
        super(mensaje);
    }
}