package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IMaterialMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Material;
import pe.edu.unmsm.fisi.siscae.service.IMaterialService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class MaterialService extends MantenibleService<Material> implements IMaterialService {

	private IMaterialMapper materialMapper;

	public MaterialService(@Qualifier("IMaterialMapper") IMantenibleMapper<Material> mapper) {

		super(mapper);
		this.materialMapper = (IMaterialMapper) mapper;

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Material> buscarTodos() {
		return this.buscar(new Material(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Material buscarPorId(Integer idMaterial) {
		Material material = Material.builder().idMaterial(idMaterial).build();
		return super.buscarPorId(material);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idMaterial) {
		Material material = Material.builder().idMaterial(idMaterial).build();
		return super.existe(material);
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
