package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IMultiTabCabMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabCab;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabCabService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class MultiTabCabService extends MantenibleService<MultiTabCab> implements IMultiTabCabService {
	private IMultiTabCabMapper multiTabCabMapper;

	public MultiTabCabService(@Qualifier("IMultiTabCabMapper") IMantenibleMapper<MultiTabCab> mapper) {
		super(mapper);
		this.multiTabCabMapper = (IMultiTabCabMapper) mapper;
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<MultiTabCab> buscarTodos() {
		return this.buscar(new MultiTabCab(), Operacion.SELECT);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public MultiTabCab buscarPorId(int idTabla) {
		MultiTabCab multiTabCab = MultiTabCab.builder().idTabla(idTabla).build();
		return super.buscarPorId(multiTabCab);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idTabla) {
		MultiTabCab multiTabCab = MultiTabCab.builder().idTabla(idTabla).build();
		return super.existe(multiTabCab);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarMultiTabCab(MultiTabCab multiTabCab) {
		this.registrar(multiTabCab);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarMultiTabCab(MultiTabCab multiTabCab) {
		this.actualizar(multiTabCab);
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarMultiTabCab(MultiTabCab multiTabCab) {
		this.eliminar(multiTabCab);
	}
}