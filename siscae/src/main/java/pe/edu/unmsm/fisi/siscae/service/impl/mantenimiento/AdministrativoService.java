package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IAdministrativoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Administrativo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.service.IAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class AdministrativoService extends MantenibleService<Administrativo> implements IAdministrativoService {

	private IAdministrativoMapper administrativoMapper;

	public AdministrativoService(@Qualifier("IAdministrativoMapper") IMantenibleMapper<Administrativo> mapper) {

		super(mapper);
		this.administrativoMapper = (IAdministrativoMapper) mapper;

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Administrativo> buscarTodos() {

		return this.buscar(new Administrativo(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Administrativo> buscarPorIdAdministrativo(Integer idAdministrativo) {

		Administrativo administrativo = Administrativo.builder()
				.persona(Persona.builder().idPersona(idAdministrativo).build()).build();

		return this.buscar(administrativo, Operacion.SELECT, OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeAdministrativo(Integer idAdministrativo) {

		return !this.buscarPorIdAdministrativo(idAdministrativo).isEmpty();
	}

	@Override
	public void registrarAdministrativo(Administrativo administrativo) {

		this.registrar(administrativo);
	}

	@Override
	public void actualizarAdministrativo(Administrativo administrativo) {

		this.actualizar(administrativo);
	}

	@Override
	public void eliminarAdministrativo(Administrativo administrativo) {

		this.eliminar(administrativo);

	}

}
