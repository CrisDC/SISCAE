package pe.edu.unmsm.fisi.siscae.configuracion.security;

import static pe.edu.unmsm.fisi.siscae.utilitario.ConstantesExcepciones.PERMISOS_NO_NULO;

import java.io.Serializable;
import java.util.List;

import org.apache.commons.lang.Validate;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import pe.edu.unmsm.fisi.siscae.utilitario.StringsUtils;

/**
 * La clase {@code BasePermissionEvaluator} tiene delegada la función de
 * controlar que los usuarios accedan a solo los recursos autorizados del sistema.
 * <p>
 * Esta clase es la implementación de {@link PermissionEvaluator} y funciona en
 * conjunto con la anotación {@literal @PreAuthorize} sobre los métodos de
 * cualquier clase que presente la anotación {@literal @Controller} o
 * {@literal @RestController}
 * 
 */
@Component
public class BasePermissionEvaluator implements PermissionEvaluator
{
    /**
     * Evalua si el usuario tiene permisos para realizar alguna acción.
     * <p>
     * Este método es llamado a través de la expresión
     * {@code hasPermission(targetDomainObject, permission)} que representa si
     * el usuario tiene permiso para realizar una determinada acción
     * (representado por <b>permission</b>) sobre algún recurso(representado por
     * <b>targetDomainObject</b>). Preste atención a los siguientes ejemplos:
     * <ul>
     * <li>La expresión hasPermission('MANT_ABC','1') indica que se desea
     * evaluar si el usuario tiene permiso de realizar la acción de registro (1)
     * sobre el recurso de Mantenimiento de ABC.
     * <li>La expresión hasPermission('MANT_ABC','ANY') indica que se desea
     * evaluar si el usuario tiene el permiso de realizar cualquier acción sobre
     * el recurso de Mantenimiento de ABC.
     * <li>La expresión hasPermission('[MANT_ABC],[MANT_XYZ]','PARENT_MENU')
     * indica que se desea evaluar si el usuario tiene el permiso de realizar
     * cualquier acción sobre el recurso de Mantenimiento de XYZ o
     * Mantenimiento ABC.
     * </ul>
     * <p>
     * Cuando este método retorna {@code false} se lanza automáticamente la
     * excepción
     * {@link org.springframework.security.access.AccessDeniedException}
     * 
     * @param targetDomainObject
     *            el recurso en tipo {@link String} e.g. MANT_ABC, MANT_XYZ.
     * @param permission
     *            la acción que el usuario desea realizar sobre el recurso.
     * @return {@code true} si el usuario tiene los permisos autorizados, en
     *         otro caso {@code false}
     */
    @Override
    @SuppressWarnings("unchecked")
    public boolean hasPermission(Authentication authentication, Object targetDomainObject,
            Object permission)
    {
        Validate.notNull(permission, PERMISOS_NO_NULO);
        boolean autorizado = false;
        List<CustomGrantedAuthority> autorizaciones = (List<CustomGrantedAuthority>) (Object) authentication
                .getAuthorities();
        System.out.println(autorizaciones);
        if (permission.equals("PARENT_MENU"))
        {
            autorizado = this.verificarPermisoPorIdRecurso(autorizaciones, targetDomainObject);
        } else
        {
            autorizado = this.verificarPermisoPorIdRecursoIdAccion(autorizaciones,
                    targetDomainObject, permission);
        }
        return autorizado;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId,
            String targetType, Object permission)
    {
        return true;
    }

    /**
     * Evalua si el recurso existente en
     * {@link CustomGrantedAuthority#getAuthority()} esta contenido dentro del
     * parámetro <b>targetDomainObject</b>.
     * <p>
     * Corresponde a las expresiones de forma
     * hasPermission({@literal '[RECURSO_1],[RECURSO_2]','PARENT_MENU'}) y
     * generalmente es utilizado para mostrar, en la barra lateral de navagación
     * del sistema, las opciones autorizadas al usuario en cuestión.
     * 
     * @param autorizaciones
     *            lista de {@link CustomGrantedAuthority} o autorizaciones del
     *            usuario.
     * @param targetDomainObject
     *            el recurso en cuestión.
     * @return true si el recurso el permiso es concedido, en otro caso retorna
     *         false.
     */
    private boolean verificarPermisoPorIdRecurso(List<CustomGrantedAuthority> autorizaciones,
            Object targetDomainObject)
    {
        int indiceAutorizacion = 0;
        boolean autorizacionEncontrada = false;
        String recursos = targetDomainObject.toString();
        while (!autorizacionEncontrada && indiceAutorizacion < autorizaciones.size())
        {
            CustomGrantedAuthority autorizacion = autorizaciones.get(indiceAutorizacion);
            if (recursos
                    .contains(StringsUtils.concatenarCadena("[", autorizacion.getAuthority(), "]")))
            {
                autorizacionEncontrada = true;
            }
            indiceAutorizacion++;
        }
        return autorizacionEncontrada;
    }

    /**
     * Evalua si el recurso <b>targetDomainObject</b> y la acción
     * <b>permission</b> existe dentro de algún
     * {@link CustomGrantedAuthority#getAuthority()} y
     * {@link CustomGrantedAuthority#getAccionRecurso()} respectivamente.
     * <p>
     * Corresponde a las expresiones de forma hasPermission('RECURSO','ACCION')
     * o hasPermission('RECURSO','ANY')
     * 
     * @param autorizaciones
     *            lista de {@link CustomGrantedAuthority} o autorizaciones del
     *            usuario.
     * @param targetDomainObject
     *            el recurso en cuestión.
     * @param permission
     *            la acción que se desea realizar sobre el recurso.
     * @return true si el permiso es concedido, en otro caso retorna false.
     */
    private boolean verificarPermisoPorIdRecursoIdAccion(
            List<CustomGrantedAuthority> autorizaciones, Object targetDomainObject,
            Object permission)
    {
        int indiceAutorizacion = 0;
        int indiceAccionRecurso = 0;
        boolean autorizacionEncontrada = false;
        String permisos = String.valueOf(permission);
        boolean multiplesAccionesEnPermisos = permisos.contains("[");

        while (!autorizacionEncontrada && indiceAutorizacion < autorizaciones.size())
        {
            CustomGrantedAuthority autorizacion = autorizaciones.get(indiceAutorizacion);
            if (autorizacion.getAuthority().equals(targetDomainObject))
            {
                autorizacionEncontrada = permisos.equals("ANY");
                if (!autorizacionEncontrada)
                {
                    indiceAccionRecurso = 0;
                    String[] accionesRecurso = autorizacion.getAccionRecurso().split(",");
                    while (!autorizacionEncontrada && indiceAccionRecurso < accionesRecurso.length)
                    {
                        String accion = accionesRecurso[indiceAccionRecurso];
                        if (multiplesAccionesEnPermisos)
                        {
                            accion = StringsUtils.concatenarCadena("[", accion, "]");
                            autorizacionEncontrada = permisos.contains(accion);
                        } else
                        {
                            autorizacionEncontrada = permisos.equals(accion);
                        }
                        indiceAccionRecurso++;
                    }
                }
            }
            indiceAutorizacion++;
        }
        return autorizacionEncontrada;
    }
}
