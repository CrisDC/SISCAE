package pe.edu.unmsm.fisi.siscae.configuracion.security;

import static org.springframework.ldap.query.LdapQueryBuilder.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.ldap.AuthenticationException;
import org.springframework.ldap.CommunicationException;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.transaction.CannotCreateTransactionException;

import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.service.IPoliticaSeguridadService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.LoginException;
import pe.edu.unmsm.fisi.siscae.service.impl.seguridad.SecAuditoriaService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesExcepciones;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ExcepcionUtil;
import pe.edu.unmsm.fisi.siscae.utilitario.StringsUtils;

@Component
@PropertySource("classpath:ldap.properties")
public class CustomAuthenticationProvider implements AuthenticationProvider
{
    @Qualifier("customUserDetailsService")
    private @Autowired UserDetailsService userDetailsService;
    private @Autowired LdapTemplate ldapTemplate;
    private @Autowired PasswordEncoder passwordEnconder;
    private @Autowired IPoliticaSeguridadService politicaSeguridadService;
    private @Autowired SecAuditoriaService auditoriaService;
    private @Autowired Environment env;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException
    {
        String idUsuario = authentication.getName();
        String password = String.valueOf(authentication.getCredentials());
        CustomUser usuario = null;
        String direccionIp = ((WebAuthenticationDetails) authentication.getDetails())
                .getRemoteAddress();
        try
        {
            usuario = (CustomUser) userDetailsService.loadUserByUsername(idUsuario);
        } catch (CannotCreateTransactionException cannotCreateTransactionException)
        {
        	throw new LoginException(ConstantesExcepciones.ERROR_CONEXION_BASE_DATOS);
        }
        if (usuario == null)
        {
           /* auditoriaService.registrarAuditoria(Tipo.Login, Comentario.UsuarioNoEncontrado,
                    Accion.Acceso, 0, idUsuario, direccionIp);
            throw new LoginException(
                    String.format(ConstantesExcepciones.USUARIO_NO_ENCONTRADO, idUsuario));*/
        }
        //boolean autenticacionActiveDirectory = politicaSeguridadService
        //        .buscarAutenticacionActiveDirectory();
        if (false)
        {
            try
            {
                ldapTemplate.authenticate(
                        query().base(env.getProperty("ldap.baseUser"))
                                .where(env.getProperty("ldap.attributeUser")).is(idUsuario),
                        password);
            } catch (AuthenticationException authenticationException)
            {
                auditoriaService.registrarAuditoria(Tipo.Login, Comentario.CredencialIncorrecta,
                        Accion.Acceso, 0, idUsuario, direccionIp);
                throw new LoginException(ExcepcionUtil.traducirMensajeDesdeMensajeErrorLdap(
                        authenticationException.getCause().getMessage(), idUsuario));
            } catch (EmptyResultDataAccessException emptyResultDataAccessException)
            {
                auditoriaService.registrarAuditoria(Tipo.Login, Comentario.UsuarioNoEncontrado,
                        Accion.Acceso, 0, idUsuario, direccionIp);
                throw new LoginException(
                        StringsUtils.concatenarCadena(ConstantesGenerales.ACTIVE_DIRECTORY,
                                ConstantesExcepciones.USUARIO_NO_ENCONTRADO));
            } catch (CommunicationException communicationException)
            {
                auditoriaService.registrarAuditoria(Tipo.Login, Comentario.ErrorActiveDirectory,
                        Accion.Acceso, 0, idUsuario, direccionIp);
                throw new LoginException(ConstantesExcepciones.ERROR_CONEXION_ACTIVE_DIRECTORY);
            }
        } else
        {
            if (!usuario.isEnabled())
            {
                auditoriaService.registrarAuditoria(Tipo.Login, Comentario.NoActivo, Accion.Acceso,
                        0, idUsuario, direccionIp);
                throw new LoginException(
                        String.format(ConstantesExcepciones.USUARIO_NO_ACTIVO, idUsuario));
            }
            if (!passwordEnconder.matches(password, usuario.getPassword()))
            {
                auditoriaService.registrarAuditoria(Tipo.Login, Comentario.CredencialIncorrecta,
                        Accion.Acceso, 0, idUsuario, direccionIp);
                throw new LoginException(ConstantesExcepciones.CONTRASENIA_INCORRECTA);
            }
        }
        auditoriaService.registrarAuditoria(Tipo.Login, Comentario.CredencialCorrecta,
                Accion.Acceso, 1, idUsuario, direccionIp);
        return new UsernamePasswordAuthenticationToken(usuario, password, usuario.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication)
    {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}