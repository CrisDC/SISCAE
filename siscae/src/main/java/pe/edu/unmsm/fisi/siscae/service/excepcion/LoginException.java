package pe.edu.unmsm.fisi.siscae.service.excepcion;

import org.springframework.security.core.AuthenticationException;

public class LoginException extends AuthenticationException
{   
    private static final long serialVersionUID = 1L;

    public LoginException(String mensaje)
    {
        super(mensaje);
    }
}