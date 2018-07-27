package pe.edu.unmsm.fisi.siscae.service.impl.practica;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.mapper.practica.IPrestamoMapper;
import pe.edu.unmsm.fisi.siscae.model.practica.Administrativo;
import pe.edu.unmsm.fisi.siscae.model.practica.Prestamo;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.service.practica.IPrestamoService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;


public class PrestamoService extends MantenibleService<Prestamo> 
implements IPrestamoService{

	private IPrestamoMapper prestamoMapper;
	
	
	public PrestamoService (@Qualifier("IPrestamoMapper") IMantenibleMapper<Prestamo> mapper ){
		
		super(mapper);
		this.prestamoMapper = (IPrestamoMapper) mapper ;
		
	}
	
	
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Prestamo> buscarTodos() {
		return this.buscar(new Prestamo(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Prestamo> buscarPorIdPrestamo(Integer idPrestamo) {

		
		Prestamo prestamo = Prestamo.builder().idAdministrativo(idPrestamo).build();
		return this.buscar(prestamo, Operacion.SELECT,OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existePrestamo(Integer idPrestamo) {
		return !this.buscarPorIdPrestamo(idPrestamo).isEmpty();
	}

	@Override
	public void registrarPrestamo(Prestamo prestamo) {

		this.registrar(prestamo);
	}

	@Override
	public void actualizarPrestamo(Prestamo prestamo) {

		this.actualizar(prestamo);
	}

	@Override
	public void eliminarPrestamo(Prestamo prestamo) {

		this.eliminar(prestamo);
	}

}
