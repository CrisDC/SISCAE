package pe.edu.unmsm.fisi.siscae.service.impl.practica;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IMaterialMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.practica.Material;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.service.practica.IMaterialService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;


public class MaterialService extends MantenibleService<Material>
implements IMaterialService{
	
	private IMaterialMapper materialMapper;
	
	
	public MaterialService (@Qualifier("IMaterialMapper") IMantenibleMapper<Material> mapper ){
		
		super(mapper);
		this.materialMapper = (IMaterialMapper) mapper ;
		
	}
	
	
	
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Material> buscarTodos() {
		return this.buscar(new Material(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Material> buscarPorIdMaterial(Integer idMaterial) {

		Material material = Material.builder().idMaterial(idMaterial).build();
		return this.buscar(material, Operacion.SELECT,OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeMaterial(Integer idMaterial) {
		return !this.buscarPorIdMaterial(idMaterial).isEmpty();
	}

	@Override
	public void registrarMaterial(Material material) {
		
		this.registrar(material);
	}

	@Override
	public void actualizarMaterial(Material material) {

		this.actualizar(material);
		
	}

	@Override
	public void eliminarMaterial(Material material) {

		this.eliminar(material);
	}

}
