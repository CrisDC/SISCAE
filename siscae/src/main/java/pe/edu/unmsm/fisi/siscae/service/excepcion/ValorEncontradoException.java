package pe.edu.unmsm.fisi.siscae.service.excepcion;

public class ValorEncontradoException extends RuntimeException
{
    private static final long serialVersionUID = 1L;

    public ValorEncontradoException(String mensaje)
    {
        super(mensaje);
    }
}
