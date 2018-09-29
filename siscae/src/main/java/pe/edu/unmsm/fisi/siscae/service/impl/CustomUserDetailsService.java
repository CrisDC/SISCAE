package pe.edu.unmsm.fisi.siscae.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.configuracion.security.CustomUser;
import pe.edu.unmsm.fisi.siscae.mapper.IRecursoMapper;
import pe.edu.unmsm.fisi.siscae.model.RecursoSistema;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;

@Service
public class CustomUserDetailsService implements UserDetailsService
{
    private @Autowired IUsuarioService usuarioService;
    private @Autowired IRecursoMapper recursoMapper;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException
    {
        Usuario usuario = usuarioService.buscarPorId(login);
        if (usuario != null)
        {
            List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
            authorities.add(new SimpleGrantedAuthority("ROLE_A"));
         
            System.out.println("Politica" + usuario); //no esta activo el usuario usuario.esActivo()
            return new CustomUser(usuario.getNombre(), usuario.getPass(), true, true, true,
                    true, authorities);
        //getGrantedAuthorities(
          //                  recursoMapper.obtenerRecursosPermitidosPorIdUsuario(login) ));
        } else
        {
            return null;
        }
    }

    private List<GrantedAuthority> getGrantedAuthorities(List<RecursoSistema> recursosPermitidos)
    {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (RecursoSistema recurso : recursosPermitidos)
        {
            authorities.add(new SimpleGrantedAuthority("ROLE_"+recurso.getIdRecurso()));
        }
        return authorities;
    }
}