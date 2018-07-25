package pe.edu.unmsm.fisi.siscae.controller.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecRecurso;
import pe.edu.unmsm.fisi.siscae.service.ISecRecursoService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;

@Audit(tipo = Tipo.Recurso, datos = Dato.Recurso)
public @RestController class RecursoController {
	private @Autowired ISecRecursoService secRecursoService;

	@Audit(accion = Accion.Consulta, comentario = Comentario.ConsultaTodos)
	@GetMapping(value = "/recurso", params = "accion=buscarTodos")
	public List<SecRecurso> getLsRecurso() {
		return secRecursoService.getLsRecurso();
	}

	@Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	@PostMapping(value = "/recurso")
	public ResponseEntity<?> registrarRecurso(@RequestBody SecRecurso recurso) {
		secRecursoService.registrarRecurso(recurso);
		return ResponseEntity.ok(secRecursoService.buscarPorCodigoRecurso(recurso.getIdRecurso()));
	}

	@Audit(accion = Accion.Actualizacion, comentario = Comentario.Actualizacion)
	@PutMapping("/recurso")
	public ResponseEntity<?> actualizarRecurso(@RequestBody SecRecurso recurso) {
		secRecursoService.actualizarRecurso(recurso);
		return ResponseEntity.ok(secRecursoService.buscarPorCodigoRecurso(recurso.getIdRecurso()));
	}

	@Audit(accion = Accion.Eliminacion, comentario = Comentario.Eliminacion)
	@DeleteMapping("/recurso")
	public ResponseEntity<?> eliminarRecurso(@RequestBody SecRecurso recurso) {
		secRecursoService.eliminarRecurso(recurso);
		return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
	}
}
