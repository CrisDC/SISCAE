package pe.edu.unmsm.fisi.siscae.service.excepcion;

public class ValorNoEncontradoException extends RuntimeException
{
    private static final long serialVersionUID = 1L;

    public ValorNoEncontradoException(String mensaje)
    {
        super(mensaje);
    }
}
