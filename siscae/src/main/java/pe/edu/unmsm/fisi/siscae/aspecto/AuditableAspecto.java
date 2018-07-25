package pe.edu.unmsm.fisi.siscae.aspecto;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.configuracion.security.SecurityContextFacade;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecAuditoria;
import pe.edu.unmsm.fisi.siscae.service.ISecAuditoriaService;
import pe.edu.unmsm.fisi.siscae.utilitario.CustomSpringExpressionLanguageParserUtil;

@Aspect
@Component
public class AuditableAspecto
{
    private @Autowired Logger logger;
    private @Autowired ISecAuditoriaService auditoriaService;

    @Around("@annotation(audit)")
    public Object registrarAuditoria(ProceedingJoinPoint proceedingJoinPoint, Audit audit)
            throws Throwable
    {
        int exito = 1;
        Tipo tipo = null;
        String datos = "";
        Comentario comentario = null;
        String comentarioParaAuditoria = "";
        boolean tieneClaseAnotacion = false;
        Accion accion = null;
        String direccionIp = SecurityContextFacade.obtenerIpCliente();
        String nombreUsuario = SecurityContextFacade.obtenerNombreUsuario();

        MethodSignature signature = (MethodSignature) proceedingJoinPoint.getSignature();
        Class<?> clazz = signature.getDeclaringType();
        tieneClaseAnotacion = this.tieneAnotacion(clazz);

        tipo = this.obtenerTipo(audit.tipo(), clazz, tieneClaseAnotacion);
        comentario = this.obtenerComentario(audit.comentario(), clazz, tieneClaseAnotacion);
        accion = this.obtenerAccion(audit.accion(), clazz, tieneClaseAnotacion);

        if (accion == Accion.REGISTRO || accion == Accion.Actualizacion
                || accion == Accion.Eliminacion || accion == Accion.Ejecucion)
        {
            datos = this.obtenerDatos(audit.datos(), clazz, tieneClaseAnotacion);
            String datosParaAuditar = CustomSpringExpressionLanguageParserUtil.getDynamicValue(
                    signature.getParameterNames(), proceedingJoinPoint.getArgs(), datos);
            comentarioParaAuditoria = String.format(comentario.toString(), tipo.toString(),
                    datosParaAuditar);
        } else
        {
            comentarioParaAuditoria = String.format(comentario.toString(), tipo.toString());
        }
        SecAuditoria auditoria = SecAuditoria.builder().codigoAuditoria(tipo.name().toUpperCase())
                .idAccion(accion.toString()).comentario(comentarioParaAuditoria)
                .direccionIp(direccionIp).nombreUsuario(nombreUsuario).build();
        try
        {
            return proceedingJoinPoint.proceed();
        } catch (Exception ex)
        {
            exito = 0;
            logger.error(ex.getMessage(), ex);
            throw ex;
        } finally
        {
            auditoria.setExito(exito);
            //auditoriaService.registrarAuditoria(auditoria);
        }
    }

    public boolean tieneAnotacion(Class<?> clazz)
    {
        return clazz.isAnnotationPresent(Audit.class);
    }

    public Tipo obtenerTipo(Tipo tipo, Class<?> clazz, boolean tieneClaseAnotacion)
    {
        if (tipo == Tipo.Ninguno && tieneClaseAnotacion)
        {
            return clazz.getAnnotation(Audit.class).tipo();
        } else
        {
            return tipo;
        }
    }

    public String obtenerDatos(Dato dato, Class<?> clazz, boolean tieneClaseAnotacion)
    {
        if (dato == Dato.Ninguno && tieneClaseAnotacion)
        {
            return clazz.getAnnotation(Audit.class).datos().toString();

        } else
        {
            return dato.toString();
        }
    }

    public Comentario obtenerComentario(Comentario comentario, Class<?> clazz,
            boolean tieneClaseAnotacion)
    {
        if (comentario == Comentario.Ninguno && tieneClaseAnotacion)
        {
            return clazz.getAnnotation(Audit.class).comentario();
        } else
        {
            return comentario;
        }
    }

    public Accion obtenerAccion(Accion accion, Class<?> clazz, boolean tieneClaseAnotacion)
    {
        if (accion == Accion.Ninguna && tieneClaseAnotacion)
        {
            return clazz.getAnnotation(Audit.class).accion();
        } else
        {
            return accion;
        }
    }
}