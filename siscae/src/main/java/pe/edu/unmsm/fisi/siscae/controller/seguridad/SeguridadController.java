package pe.edu.unmsm.fisi.siscae.controller.seguridad;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.service.IAccionService;
import pe.edu.unmsm.fisi.siscae.service.ICategoriaRecursoService;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;
import pe.edu.unmsm.fisi.siscae.service.ISecPerfilService;
import pe.edu.unmsm.fisi.siscae.service.ISecTipoAuditoriaService;
import pe.edu.unmsm.fisi.siscae.service.ISecUsuarioService;
import pe.edu.unmsm.fisi.siscae.utilitario.MultiTablaUtil;

@Vista
public @Controller class SeguridadController {
	private @Autowired ISecPerfilService secPerfilService;
	private @Autowired ISecUsuarioService secUsuarioService;
	private @Autowired IMultiTabDetService multiTabDetService;
	private @Autowired ISecTipoAuditoriaService secTipoAuditoriaService;
	private @Autowired ICategoriaRecursoService categoriaRecursoService;
	private @Autowired IAccionService accionService;

	@GetMapping(value = "/seguridad/perfil")
	public String verPerfiles(Model model) {
		return "seguras/seguridad/perfil";
	}

	@GetMapping(value = "/seguridad/recurso")
	public String verRecursos(Model model) {
		model.addAttribute("lsCategoriaRecurso", categoriaRecursoService.getLsCategoriaRecurso());
		return "seguras/seguridad/recurso";
	}

	@GetMapping(value = "/seguridad/usuario")
	public String verUsuarios(Model model) {
		model.addAttribute("TiposPerfiles", secPerfilService.getLsPerfil());
		return "seguras/seguridad/usuario";
	}

	@GetMapping(value = "/seguridad/perfilRecurso")
	public String verPerfilesRecursos(Model model) {
		model.addAttribute("categoriasRecurso", categoriaRecursoService.buscarTodosCategoriaRecurso());
		return "seguras/seguridad/perfilRecurso";
	}

	@GetMapping(value = "/seguridad/{seguridad:auditoria}")
	public String verAuditoria(@PathVariable String seguridad, Model model) {
		model.addAttribute("seguridad", seguridad);
		model.addAttribute("Usuarios", secUsuarioService.getLsUsuario());
		model.addAttribute("tiposAuditoria", secTipoAuditoriaService.buscarTodos());
		model.addAttribute("accionesAuditoria",
				multiTabDetService.buscarPorIdTabla(MultiTablaUtil.TABLA_ACCION_AUDITORIA));
		return "seguras/auditoria/auditoria";
	}

	@GetMapping(value = "/seguridad/contrasenia")
	public String verContraseniaFormulario(Model model, Principal principal) {
		model.addAttribute("usuario", principal.getName());
		return "seguras/seguridad/contrasenia";
	}

	@GetMapping(value = "/seguridad/politicas")
	public String verPoliticaSeguridad() {
		return "seguras/seguridad/politicaSeguridad";
	}

	@GetMapping(value = "/seguridad/permisoAccion")
	public String verPermisoAccion() {
		return "seguras/seguridad/permisoAccion";
	}

	@GetMapping(value = "/seguridad/acciones")
	public String verAcciones() {
		return "seguras/seguridad/acciones";
	}

	@GetMapping(value = "/seguridad/categoriaRecurso")
	public String verCategoriaRecursoPrueba(Model model) {
		model.addAttribute("acciones", accionService.getLsAcciones());
		return "seguras/seguridad/categoriaRecurso";
	}
}