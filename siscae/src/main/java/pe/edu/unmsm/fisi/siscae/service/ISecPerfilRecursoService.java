package pe.edu.unmsm.fisi.siscae.service;

import pe.edu.unmsm.fisi.siscae.model.seguridad.SecPerfil;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecPerfilRecurso;

public interface ISecPerfilRecursoService extends IMantenibleService<SecPerfilRecurso> {
	
	public void asignarPermisos(SecPerfil perfil);
}