package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IAreaAdministrativoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;
import pe.edu.unmsm.fisi.siscae.service.IAreaAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class AreaAdministrativoService extends MantenibleService<AreaAdministrativo>
		implements IAreaAdministrativoService {

	private IAreaAdministrativoMapper areaAdministrativoMapper;

	public AreaAdministrativoService(
			@Qualifier("IAreaAdministrativoMapper") IMantenibleMapper<AreaAdministrativo> mapper) {
		super(mapper);

		this.areaAdministrativoMapper = (IAreaAdministrativoMapper) mapper;
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<AreaAdministrativo> buscarTodos() {

		return this.buscar(new AreaAdministrativo(), Operacion.SELECT);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public AreaAdministrativo buscarPorId(Integer idAreaAdministrativo) {
		AreaAdministrativo areaAdministrativo = AreaAdministrativo.builder().idAreaAdministrativo(idAreaAdministrativo)
				.build();
		return super.buscarPorId(areaAdministrativo);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idAreaAdministrativo) {
		AreaAdministrativo areaAdministrativo = AreaAdministrativo.builder().idAreaAdministrativo(idAreaAdministrativo)
				.build();
		return super.existe(areaAdministrativo);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarAreaAdministrativo(AreaAdministrativo areaAdministrativo) {
		this.registrar(areaAdministrativo);

	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarAreaAdministrativo(AreaAdministrativo areaAdministrativo) {
		this.actualizar(areaAdministrativo);

	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarAreaAdministrativo(AreaAdministrativo areaAdministrativo) {
		this.eliminar(areaAdministrativo);

	}
}
