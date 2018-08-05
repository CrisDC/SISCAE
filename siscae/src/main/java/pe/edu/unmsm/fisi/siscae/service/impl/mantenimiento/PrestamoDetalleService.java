package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IPrestamoDetalleMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.PrestamoDetalle;
import pe.edu.unmsm.fisi.siscae.service.IPrestamoDetalleService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;
@Service
public class PrestamoDetalleService extends MantenibleService<PrestamoDetalle> implements IPrestamoDetalleService {
	private IPrestamoDetalleMapper prestamoDetalleMapper;

	public PrestamoDetalleService(@Qualifier("IPrestamoDetalleMapper") IMantenibleMapper<PrestamoDetalle> mapper)
	{
	    super(mapper);
	    this.prestamoDetalleMapper = (IPrestamoDetalleMapper) mapper;
	}

@Transactional(propagation = Propagation.REQUIRES_NEW)
public List<PrestamoDetalle> buscarTodos() {
	return this.buscar(new PrestamoDetalle(), Operacion.SELECT);
	
}

@Transactional(propagation=Propagation.REQUIRES_NEW)
public List<PrestamoDetalle> buscarPorIdPrestamoDetalle(Integer idPrestamo, Integer idMaterial) {
	PrestamoDetalle prestamoDetalle= PrestamoDetalle.builder().build();
	prestamoDetalle.setIdMaterial(idMaterial);
	prestamoDetalle.setIdPrestamo(idPrestamo);
	return this.buscar(prestamoDetalle,Operacion.SELECT,OperacionParam.PRIMARY_KEY);
}

@Transactional(propagation=Propagation.REQUIRED)
public boolean existePrestamoDetalle(Integer idPrestamo, Integer idMaterial) {
	return !this.buscarPorIdPrestamoDetalle(idPrestamo,idMaterial).isEmpty();
}

@Transactional(propagation=Propagation.REQUIRES_NEW)
public void registrarPrestamoDetalle(PrestamoDetalle prestamoDetalle) {
	this.registrar( prestamoDetalle);
	
}

@Transactional(propagation=Propagation.REQUIRES_NEW)
public void actualizarPrestamoDetalle(PrestamoDetalle prestamoDetalle) {
	this.actualizar(prestamoDetalle);
	
}

@Transactional(propagation = Propagation.REQUIRES_NEW)
public void eliminarPrestamoDetalle(PrestamoDetalle prestamoDetalle) {
	this.eliminar( prestamoDetalle);

}}
