package pe.edu.unmsm.fisi.siscae.configuracion.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

public class SecurityContextFacade
{
    public static String obtenerNombreUsuario()
    {
        String nombreUsuario = null;
        CustomUser user = getAuthenticatedUser();
        if (user != null)
        {
            nombreUsuario = user.getUsername();
        }
        return nombreUsuario;
    }

    public static boolean hasAuthenticatedUserRole(String role)
    {
        for (GrantedAuthority authority : getAuthenticatedUser().getAuthorities())
        {
            if (authority.getAuthority().equals(role.toString()))
            {
                return true;
            }
        }
        return false;
    }

    public static CustomUser getAuthenticatedUser()
    {
        Authentication aut = SecurityContextHolder.getContext().getAuthentication();
        if (aut == null)
        {
            return null;
        } else
        {
            return (CustomUser) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
        }
    }

    public static String obtenerIpCliente()
    {
        Object details = SecurityContextHolder.getContext().getAuthentication().getDetails();
        if (details instanceof WebAuthenticationDetails)
        {
            String ipAddress = ((WebAuthenticationDetails) details).getRemoteAddress();
            return ipAddress;
        }
        return "0.0.0.0";
    }
}