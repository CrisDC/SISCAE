package pe.edu.unmsm.fisi.siscae.configuracion.security;

import static pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales.AJAX_HEADER;
import static pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales.URL_LOGIN;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.session.InvalidSessionStrategy;

/**
 * La clase {@code CustomInvalidSessionStrategy} tiene la función de establecer
 * un procedimiento o estrategia cuando se detecte que un usuario intenta
 * acceder o navegar en el sistema con una <b>sesión inválida</b>.
 * <p>
 * Esta clase implementa {@link InvalidSessionStrategy} y es en
 * {@link SecurityConfiguration#configure(org.springframework.security.config.annotation.web.builders.HttpSecurity)}
 * donde se configura para ser la estrategia por defecto a usar.
 * <p>
 * Las causa más común para que la sesión de un usuario se invalide, es que
 * dicha sesión haya expirado por inactividad.
 * 
 * @see SecurityConfiguration
 */
public class CustomInvalidSessionStrategy implements InvalidSessionStrategy
{
    /**
     * Detecta la sesión inválida de un usuario para redirigirlo a la página de
     * LOGIN e inicie una nueva sesión.
     * <p>
     * Este método es capaz de distinguir si el {@code request} proviene de una
     * petición {@code AJAX}, si fuera el caso responde enviando el código de
     * error {@code HttpStatus.UNAUTHORIZED} sino redirige al usuario a la
     * página de LOGIN.
     */
    @Override
    public void onInvalidSessionDetected(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException
    {
        RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
        String ajaxHeader = request.getHeader("X-Requested-With");
        if (AJAX_HEADER.equals(ajaxHeader))
        {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), URL_LOGIN);
        } else
        {
            request.getSession(true);
            redirectStrategy.sendRedirect(request, response, URL_LOGIN);
        }
    }
}