package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import pe.edu.unmsm.fisi.siscae.mapper.IFacultadMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Facultad;
import pe.edu.unmsm.fisi.siscae.service.IFacultadService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

import static pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam.*;;
@Service
public class FacultadService extends MantenibleService<Facultad> implements IFacultadService {

	 private IFacultadMapper facultadMapper;

	    public FacultadService(@Qualifier("IFacultadMapper") IMantenibleMapper<Facultad> mapper)
	    {
	        super(mapper);
	        this.facultadMapper = (IFacultadMapper) mapper;
	    }

		@Override
		@Transactional(propagation = Propagation.REQUIRES_NEW)
		public List<Facultad> buscarTodos() {
			// TODO Auto-generated method stub
			return super.buscar(new Facultad(), Operacion.SELECT);
		}

		
		@Override
		@Transactional(propagation = Propagation.REQUIRED)
		public List<Facultad> buscarPorIdFacultad(Integer idFacultad) {

			Facultad facultad = Facultad.builder().idFacultad(idFacultad).build();
		    return super.buscar(facultad, Operacion.SELECT, Operacion.OperacionParam.PRIMARY_KEY);
		}

		@Override
		@Transactional(propagation = Propagation.REQUIRED)
		public boolean existeFacultad(Integer idFacultad) {
			 return !this.buscarPorIdFacultad(idFacultad).isEmpty();
		}

		@Override
		@Transactional(propagation = Propagation.REQUIRES_NEW)
		public void registrarFacultad(Facultad facultad) {
			this.registrar(facultad);
			
		}

		@Override
		@Transactional(propagation = Propagation.REQUIRES_NEW)
		public void actualizarFacultad(Facultad facultad) {
			  this.actualizar(facultad);
			
		}

		@Override
		@Transactional(propagation = Propagation.REQUIRES_NEW)
		public void eliminarFacultad(Facultad facultad) {
			this.eliminar(facultad);
			
		}

}
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
