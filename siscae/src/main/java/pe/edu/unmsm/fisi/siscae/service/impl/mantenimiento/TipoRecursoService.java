package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ITipoRecursoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.TipoRecurso;
import pe.edu.unmsm.fisi.siscae.service.ITipoRecursoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class TipoRecursoService extends MantenibleService <TipoRecurso> implements ITipoRecursoService  
{
	private ITipoRecursoMapper tipoRecursoMapper;
	public TipoRecursoService(@Qualifier("ITipoRecursoMapper") IMantenibleMapper<TipoRecurso> mapper)
    {
        super(mapper);
        this.tipoRecursoMapper = (ITipoRecursoMapper) mapper;
    }
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<TipoRecurso> buscarTodos() {
		return this.buscar(new TipoRecurso(), Operacion.SELECT);
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<TipoRecurso> buscarPorIdTipoRecurso(Integer idTipoRecurso) {
		TipoRecurso tipoRecurso =TipoRecurso.builder().idTipoRecurso(idTipoRecurso).build();
		return super.buscar(tipoRecurso, Operacion.SELECT,OperacionParam.PRIMARY_KEY);
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeTipoRecurso(Integer idTipoRecurso) {
		// TODO Auto-generated method stub
	return !this.buscarPorIdTipoRecurso(idTipoRecurso).isEmpty();
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarTipoRecurso(TipoRecurso tiporecurso) {
		this.registrar(tiporecurso);
		
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarTipoRecurso(TipoRecurso tiporecurso) {
		this.actualizar(tiporecurso);
		
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarTipoRecurso(TipoRecurso tiporecurso) {
		this.eliminar(tiporecurso);
		
	}

}
