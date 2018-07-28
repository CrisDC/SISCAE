package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IAreaEstudioMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaEstudio;
import pe.edu.unmsm.fisi.siscae.service.IAreaEstudioService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;
@Service
public class AreaEstudioService extends MantenibleService<AreaEstudio> implements IAreaEstudioService {
	private IAreaEstudioMapper areaEstudioMapper;
	
	public AreaEstudioService(@Qualifier("IAreaEstudioMapper")IMantenibleMapper<AreaEstudio> mapper){
		super(mapper);
		this.areaEstudioMapper=(IAreaEstudioMapper) mapper;
	}
	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public List<AreaEstudio> buscarTodos() {
		
		return this.buscar(new AreaEstudio(), Operacion.SELECT);
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public List<AreaEstudio> buscarPorIdAreaEstudio(Integer idAreaEstudio) {
		AreaEstudio areaEstudio= AreaEstudio.builder().idAreaEstudio(idAreaEstudio).build();
		return this.buscar(areaEstudio, Operacion.SELECT);
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public boolean existeAreaEstudio(Integer idAreaEstudio) {
		
		return !this.buscarPorIdAreaEstudio(idAreaEstudio).isEmpty();
	}

	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public void registrarAreaEstudio(AreaEstudio areaEstudio) {
		this.registrar(areaEstudio);
		
	}

	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public void actualizarAreaEstudio(AreaEstudio areaEstudio) {
		this.actualizar(areaEstudio);
		
	}

	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public void eliminarAreaEstudio(AreaEstudio areaEstudio) {
		this.eliminar(areaEstudio);
		
	}

}
