package pe.edu.unmsm.fisi.siscae.controller.seguridad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.seguridad.SecPerfil;
import pe.edu.unmsm.fisi.siscae.service.ISecPerfilRecursoService;

public @RestController class PerfilRecursoController {
	private @Autowired ISecPerfilRecursoService secPerfilRecursoService;

	@PostMapping(value = "/perfilRecurso", params = "accion=asignarPermiso")
	public void asignarPermisos(@RequestBody SecPerfil perfil) {
		secPerfilRecursoService.asignarPermisos(perfil);
	}
}
