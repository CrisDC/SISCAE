package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ISolicitudTramiteMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaNumeroDocumento;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.SolicitudTramite;
import pe.edu.unmsm.fisi.siscae.service.ISolicitudTramiteService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class SolicitudTramiteService extends MantenibleService<SolicitudTramite> implements ISolicitudTramiteService {
	private ISolicitudTramiteMapper solicitudTramiteMapper;

	public SolicitudTramiteService(@Qualifier("ISolicitudTramiteMapper") IMantenibleMapper<SolicitudTramite> mapper) {
		super(mapper);
		this.solicitudTramiteMapper = (ISolicitudTramiteMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<SolicitudTramite> buscarTodos() {
		return this.buscar(new SolicitudTramite(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<SolicitudTramite> buscarPorIdSolicitudTramite(Integer idSolicitudTramite) {
		SolicitudTramite solicitudTramite = SolicitudTramite.builder().idSolicitudTramite(idSolicitudTramite).build();
		return this.buscar(solicitudTramite, Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<SolicitudTramite> buscarPorUsuario(String idUsuario) {
		SolicitudTramite solicitudTramite = SolicitudTramite.builder().build();
		return this.buscar(solicitudTramite, OperacionParam.USUARIO);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<SolicitudTramite> buscarPorNumeroDocumento(
			CriterioBusquedaNumeroDocumento criterioBusquedaNumeroDocumento) {
		return this.buscarPorNumeroDocumento(criterioBusquedaNumeroDocumento);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeSolicitudTramite(Integer idSolicitudTramite) {
		return !this.buscarPorIdSolicitudTramite(idSolicitudTramite).isEmpty();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarSolicitudTramite(SolicitudTramite solicitudTramite) {
		this.registrar(solicitudTramite);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarSolicitudTramite(SolicitudTramite solicitudTramite) {
		this.actualizar(solicitudTramite);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarSolicitudTramite(SolicitudTramite solicitudTramite) {
		this.eliminar(solicitudTramite);
	}

}