package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IRecursoMapper;
import pe.edu.unmsm.fisi.siscae.model.Recurso;
import pe.edu.unmsm.fisi.siscae.service.IRecursoService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class RecursoService implements IRecursoService
{

	@Override
	public void registrar(pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso dto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void actualizar(pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso dto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void eliminar(pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso dto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso> buscar(
			pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso dto, Operacion operacion) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso> buscar(
			pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso dto, Operacion operacion,
			OperacionParam operacionParam) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void mantener(pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso dto, Operacion operacion) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso> buscarTodos() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso> buscarPorIdRecurso(Integer idRecurso) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean existeRecurso(Integer idRecurso) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void registrarRecurso(pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso recurso) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void actualizarRecurso(pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso recurso) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void eliminarRecurso(pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso recurso) {
		// TODO Auto-generated method stub
		
	}
    /*private @Autowired IRecursoMapper recursoMapper;

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Recurso> obtenerRecursosPermitidosPorIdUsuario(String idUsuario)
    {
        return recursoMapper.obtenerRecursosPermitidosPorIdUsuario(idUsuario);
    }
    */
}