package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.mapper.ISecAuditoriaMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaAuditoria;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecAuditoria;
import pe.edu.unmsm.fisi.siscae.service.ISecAuditoriaService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Conversor;
import pe.edu.unmsm.fisi.siscae.utilitario.DatesUtils;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class SecAuditoriaService extends MantenibleService<SecAuditoria>
        implements ISecAuditoriaService
{
    private ISecAuditoriaMapper secAuditoriaMapper;

    public SecAuditoriaService(
            @Qualifier("ISecAuditoriaMapper") IMantenibleMapper<SecAuditoria> mapper)
    {
        super(mapper);
        this.secAuditoriaMapper = (ISecAuditoriaMapper) mapper;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<SecAuditoria> getLsAuditoria()
    {
        return this.buscar(new SecAuditoria(), Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<SecAuditoria> obtenerResultadoPorFecha(String fechaInicioAuditoria,
            String fechaFinAuditoria)
    {
        Date fechaInicioSql = Conversor.dateValueOfOrCurrentDate(fechaInicioAuditoria);
        Date fechaFinSql = Conversor.dateValueOfOrCurrentDate(fechaFinAuditoria);
        SecAuditoria secAuditoria = SecAuditoria.builder().fechaInicio(fechaInicioSql)
                .fechaFin(fechaFinSql).build();
        return this.buscar(secAuditoria, Operacion.SELECT);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<SecAuditoria> obtenerResultadoPorFecha(CriterioBusquedaAuditoria criterioBusqueda)
    {
        return secAuditoriaMapper.busquedaFiltrosAuditoria(criterioBusqueda);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarAuditoria(SecAuditoria auditoria)
    {
        auditoria.setFecha(new java.util.Date());
        auditoria.setHora(
                DatesUtils.obtenerFechaEnFormato(new java.util.Date(), DatesUtils.FORMATO_HHMMSS));
        this.registrar(auditoria);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void registrarAuditoria(Tipo tipo, Comentario comentario, Accion accion, int exito,
            String nombreUsuario, String direccionIp)
    {
        SecAuditoria auditoria = SecAuditoria
                .builder().codigoAuditoria(tipo.name().toUpperCase()).idAccion(accion.toString())
                .comentario(comentario.toString()).exito(exito).direccionIp(direccionIp)
                .nombreUsuario(nombreUsuario).fecha(new java.util.Date()).hora(DatesUtils
                        .obtenerFechaEnFormato(new java.util.Date(), DatesUtils.FORMATO_HHMMSS))
                .build();
        secAuditoriaMapper.mantener(new Parametro(Operacion.INSERT, auditoria));
    }
}