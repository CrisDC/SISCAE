package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ISecPerfilRecursoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecPerfil;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecPerfilRecurso;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecRecurso;
import pe.edu.unmsm.fisi.siscae.service.ISecPerfilRecursoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;

@Service
public class SecPerfilRecursoService extends MantenibleService<SecPerfilRecurso> implements ISecPerfilRecursoService {
	private ISecPerfilRecursoMapper secPerfilRecursoMapper;

	public SecPerfilRecursoService(@Qualifier("ISecPerfilRecursoMapper") IMantenibleMapper<SecPerfilRecurso> mapper) {
		super(mapper);
		this.secPerfilRecursoMapper = (ISecPerfilRecursoMapper) mapper;
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void asignarPermisos(SecPerfil perfil) {
		SecPerfilRecurso perfilRecurso = new SecPerfilRecurso();
		String idPerfil = perfil.getIdPerfil();
		perfilRecurso.setIdPerfil(idPerfil);
		List<SecRecurso> recursos = perfil.getRecursos();
		secPerfilRecursoMapper.eliminarPermisos(idPerfil);
		for (SecRecurso secRecurso : recursos) {
			perfilRecurso.setIdRecurso(secRecurso.getIdRecurso());
			perfilRecurso.setPermiso(secRecurso.getAccionRecurso());
			this.registrar(perfilRecurso);
		}
	}
}