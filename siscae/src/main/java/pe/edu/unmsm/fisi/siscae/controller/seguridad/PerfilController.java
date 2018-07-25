package pe.edu.unmsm.fisi.siscae.controller.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecPerfil;
import pe.edu.unmsm.fisi.siscae.service.ISecPerfilService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;

@Audit(tipo = Tipo.Perfil, datos = Dato.Perfil)
@RequestMapping("/perfil")
public @RestController class PerfilController {
	private @Autowired ISecPerfilService secPerfilService;

	@Audit(accion = Accion.Consulta, comentario = Comentario.ConsultaTodos)
	@GetMapping(params = "accion=buscarTodos")
	public List<SecPerfil> buscarTodos() {
		return secPerfilService.getLsPerfil();
	}

	@GetMapping(value = "/{idPerfil}", params = "accion=buscarRecursos")
	public List<SecPerfil> buscarRecursosPorIdPerfil(@PathVariable String idPerfil) {
		return secPerfilService.buscarRecursosPorIdPerfil(idPerfil);
	}

	@Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	@PostMapping
	public ResponseEntity<?> registrarPerfil(@RequestBody SecPerfil perfil) {
		secPerfilService.registrarPerfil(perfil);
		return ResponseEntity.ok(secPerfilService.buscarPorCodigoPerfil(perfil.getIdPerfil()));
	}

	@Audit(accion = Accion.Actualizacion, comentario = Comentario.Actualizacion)
	@PutMapping
	public ResponseEntity<?> actualizarPerfil(@RequestBody SecPerfil perfil) {
		secPerfilService.actualizarPerfil(perfil);
		return ResponseEntity.ok(secPerfilService.buscarPorCodigoPerfil(perfil.getIdPerfil()));
	}

	@Audit(accion = Accion.Eliminacion, comentario = Comentario.Eliminacion)
	@DeleteMapping
	public ResponseEntity<?> eliminarPerfil(@RequestBody SecPerfil perfil) {
		secPerfilService.eliminarPerfil(perfil);
		return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
	}

	@PostMapping(params = "accion=asignarPermisos")
	public ResponseEntity<?> asignarPermisos(@RequestBody SecPerfil perfil) {
		System.out.println(perfil);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	}
}