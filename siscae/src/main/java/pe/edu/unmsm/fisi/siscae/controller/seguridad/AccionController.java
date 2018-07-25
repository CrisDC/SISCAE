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

import pe.edu.unmsm.fisi.siscae.model.seguridad.SecAccion;
import pe.edu.unmsm.fisi.siscae.service.IAccionService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;

public @RestController class AccionController {
	private @Autowired IAccionService accionService;

	@GetMapping(value = "/acciones", params = "accion=buscarTodos")
	public List<SecAccion> getLsAcciones() {
		return accionService.getLsAcciones();
	}

	@PostMapping(value = "/acciones")
	public ResponseEntity<?> registrarAccion(@RequestBody SecAccion accion) {
		accionService.registrarAccion(accion);
		return ResponseEntity.ok(accionService.buscarPorCodigoAccion(accion.getIdAccion()));
	}

	@PutMapping("/acciones")
	public ResponseEntity<?> actualizarAccion(@RequestBody SecAccion accion) {
		accionService.actualizarAccion(accion);
		return ResponseEntity.ok(accionService.buscarPorCodigoAccion(accion.getIdAccion()));
	}

	@DeleteMapping("/acciones")
	public ResponseEntity<?> eliminarAccion(@RequestBody SecAccion accion) {
		accionService.eliminarAccion(accion);
		return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
	}
}
