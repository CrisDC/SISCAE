package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.practicas;

import java.util.List;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.practica.Material;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.service.practica.IMaterialService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;


public @RestController class MaterialController {

	
	private @Autowired IMaterialService materialService;
	
	public List<Material> buscarTodos(){
		return materialService.buscarTodos();
	}
	
	public ResponseEntity<?> registrarMaterial(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Material material,
			Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		materialService.registrarMaterial(material);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
		
	}
	
	public ResponseEntity<?> actualizarMaterial(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Material material,
			Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		materialService.actualizarMaterial(material);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
		
	}
	
	public ResponseEntity<?> eliminarMaterial(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Material material,
			Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		materialService.eliminarMaterial(material);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
		
	}
	
	
}
