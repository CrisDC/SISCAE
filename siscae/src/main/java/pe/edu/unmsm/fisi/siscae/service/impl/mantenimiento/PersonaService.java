package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IPersonaMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.service.IPersonaService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class PersonaService extends MantenibleService<Persona> implements IPersonaService {

	private IPersonaMapper personaMapper;

	public PersonaService(@Qualifier("IPersonaMapper") IMantenibleMapper<Persona> mapper) {
		super(mapper);
		this.personaMapper = (IPersonaMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Persona> buscarTodos() {
		return super.buscar(new Persona(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Persona buscarPorId(Integer idPersona) {
		Persona persona = Persona.builder().idPersona(idPersona).build();
		return super.buscarPorId(persona);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idPersona) {
		Persona persona = Persona.builder().idPersona(idPersona).build();
		return super.existe(persona);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarPersona(Persona persona) {
		super.registrar(persona);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarPersona(Persona persona) {
		super.actualizar(persona);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarPersona(Persona persona) {
		super.eliminar(persona);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Persona buscarPorNumeroDocumentoIdentidad(String numeroDocumento) {
		// TODO Auto-generated method stub
		return null;
	}

}
