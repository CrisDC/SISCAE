package pe.edu.unmsm.fisi.siscae.configuracion.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.Assert;


/**
 * La clase {@code CustomGrantedAuthority} representa una <b>autorización</b> en
 * el sistema.
 * <p>
 * Cada usuario del sistema tiene asignado una lista de autorizaciones, cada
 * autorización esta conformado por un <b>recurso</b> y un <b>conjunto de
 * acciones</b> aplicables a dicho recurso.
 * 
 * @see pe.edu.unmsm.fisi.siscae.configuracion.security.BasePermissionEvaluator
 */
public class CustomGrantedAuthority implements GrantedAuthority
{
    private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

    private final String idRecurso;
    private final String accionRecurso;

    /**
     * Crea una autorización
     * 
     * @param idRecurso
     *            el identificador o código único del recurso.
     * @param accionRecurso
     *            el conjunto de acciones aplicadas al recurso
     */
    public CustomGrantedAuthority(String idRecurso, String accionRecurso)
    {
        this.idRecurso = idRecurso;
        this.accionRecurso = accionRecurso;
    }

    /**
     * @return el identificador del recurso <b>idRecurso</b>
     */
    @Override
    public String getAuthority()
    {
        return this.idRecurso;
    }

    /**
     * Si existen dos o más acciones aplicadas al recurso, estas serán divididas
     * a través de comas (,) e.g. '1,2,3,4'.
     * 
     * @return el conjunto de acciones aplicados al recurso
     */
    public String getAccionRecurso()
    {
        return this.accionRecurso;
    }

    @Override
    public String toString()
    {
        return "CustomGrantedAuthority [idRecurso=" + idRecurso + ", accionRecurso=" + accionRecurso
                + "]";
    }
}