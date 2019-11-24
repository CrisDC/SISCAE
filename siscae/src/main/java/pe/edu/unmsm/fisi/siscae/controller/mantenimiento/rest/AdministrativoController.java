package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;

import java.util.List;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Administrativo;
import pe.edu.unmsm.fisi.siscae.service.IAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Audit(tipo = Tipo.ADMINISTRATIVO, datos = Dato.ADMINISTRATIVO)
@RequestMapping("/administrativo")
public @RestController class AdministrativoController {

	private @Autowired IAdministrativoService administrativoService;
	@Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaTodos)
	@PreAuthorize("hasPermission('MANT_CITAS', '[2],[3],[4]')")
	@GetMapping(params = "accion=buscarTodos")
	public List<Administrativo> buscarTodos(){
		
		return administrativoService.buscarTodos();
		
	}
	@Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	@PreAuthorize("hasPermission('MANT_ADMINISTRATIVO', '1')")
	@PostMapping
	public ResponseEntity<?> registrarAdministrativo(
		@Validated({ Default.class, IRegistro.class }) @RequestBody Administrativo administrativo,
		Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		administrativoService.registrarAdministrativo(administrativo);
		 return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	}
	@Audit(accion = Accion.ACTUALIZACION, comentario = Comentario.Actualizacion)
	@PutMapping
	public ResponseEntity<?> actualizarAdministrativo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Administrativo administrativo,
			Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		administrativoService.actualizarAdministrativo(administrativo);
		 return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
	}
	@Audit(accion = Accion.ELIMINACION, comentario = Comentario.Eliminacion)
	@DeleteMapping
	public ResponseEntity<?> eliminarAdministrativo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Administrativo administrativo,
			Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		
		administrativoService.eliminarAdministrativo(administrativo);
		return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
	}
	
}
