package pe.edu.unmsm.fisi.siscae.configuracion.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import pe.edu.unmsm.fisi.siscae.service.impl.CustomUserDetailsService;

/**
 * La clase {@code CustomUser} representa al usuario solo durante el proceso
 * identificación.
 * <p>
 * Esta clase extiende de {@link User} a fin de tener una mayor facilidad en el
 * uso de la clase {@link CustomUserDetailsService}
 * 
 * @see CustomUserDetailsService
 */
@Getter
public class CustomUser extends User
{
    private static final long serialVersionUID = 1L;
    private Integer idUsuario;
    /**
     * Crea el usuario con sus detalles.
     * 
     * @param username
     *            nombre de usuario presentado en el inicio de sesión.
     * @param password
     *            contraseña presentada en el inicio de sesión.
     * @param enabled
     *            si es {@code true} el usuario esta activo.
     * @param accountNonExpired
     *            si es {@code true} la cuenta no ha expirado.
     * @param credentialsNonExpired
     *            si es {@code true} las credenciales no han expirado.
     * @param accountNonLocked
     *            si es {@code true} la cuenta no ha sido bloqueada
     * @param authorities
     *            la lista de autorizaciones concedidas cuando el proceso de
     *            identificación es correcto.
     */
    public CustomUser(String username, String password, boolean enabled, boolean accountNonExpired,
            boolean credentialsNonExpired, boolean accountNonLocked,
            Collection<? extends GrantedAuthority> authorities)
    {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired,
                accountNonLocked, authorities);
    }
}