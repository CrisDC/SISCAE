package pe.edu.unmsm.fisi.siscae.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.configuracion.security.CustomGrantedAuthority;
import pe.edu.unmsm.fisi.siscae.configuracion.security.CustomUser;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilRecursoSeguridad;
import pe.edu.unmsm.fisi.siscae.service.IPerfilRecursoSeguridadService;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;
/**
 * Ejecuta la lógica de negocio para la obtención de la información de algún
 * usuario, principalmente usado en el proceso de identificación y/o
 * autenticación.
 * <p>
 * Esta clase implementa el método {@code loadUserByUsername} de la interface
 * {@link UserDetailsService}.
 * 
 */
@Service
public class CustomUserDetailsService implements UserDetailsService
{
    private @Autowired IUsuarioService usuarioService;
    private @Autowired IPerfilRecursoSeguridadService perfilRecursoService;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public UserDetails loadUserByUsername(String login)
    {
        Usuario usuario = usuarioService.buscarPorNombre(login);
        CustomUser user = null;
        if (usuario != null)
        {            
            user = new CustomUser(usuario.getNombre(), usuario.getPass(),
                    usuario.isActivo(), true, true, true,
                    asignarPermisos(perfilRecursoService.buscarPorNombreUsuario(login))
                    );
        }
        return user;
    }

    /**
     * Convierte la clase {@link SecRecurso} y sus acciones autorizada en la
     * clase {@link GrantedAuthority}.
     * 
     * @param recursosAsigandos
     *            lista de {@link SecRecurso} a convertir
     * @return la lista de {@link GrantedAuthority}
     */
    private List<GrantedAuthority> asignarPermisos(List<PerfilRecursoSeguridad> recursosAsigandos)
    {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (PerfilRecursoSeguridad recurso : recursosAsigandos)
        {
            authorities.add(
                    new CustomGrantedAuthority(recurso.getNombreRecurso(), recurso.getAcciones()));
        }
        return authorities;
    }
}