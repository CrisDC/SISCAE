package pe.edu.unmsm.fisi.siscae.configuracion.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;

@Getter
public class CustomUser extends User
{
    private static final long serialVersionUID = 1L;
    private Integer idUsuario;

    public CustomUser(Integer idUsuario,String username, String password, boolean enabled, boolean accountNonExpired,
            boolean credentialsNonExpired, boolean accountNonLocked,
            Collection<? extends GrantedAuthority> authorities)
    {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired,
                accountNonLocked, authorities);
        this.idUsuario=idUsuario;
    }
}