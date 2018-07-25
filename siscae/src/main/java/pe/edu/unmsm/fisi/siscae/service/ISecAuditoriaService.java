package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaAuditoria;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecAuditoria;

public interface ISecAuditoriaService extends IMantenibleService<SecAuditoria>
{
    public List<SecAuditoria> getLsAuditoria();

    public List<SecAuditoria> obtenerResultadoPorFecha(CriterioBusquedaAuditoria criterio);

	public List<SecAuditoria> obtenerResultadoPorFecha(String fechaInicio, String fechaFin);

	public void registrarAuditoria(SecAuditoria auditoria);

	public void registrarAuditoria(Tipo tipo, Comentario comentario, Accion accion, int exito,
            String nombreUsuario, String direccionIp);
}