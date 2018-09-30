package pe.edu.unmsm.fisi.siscae.controller.consulta.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecurso;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosService;

@RequestMapping("/consultaPrestamo")
public @RestController class ConsultaPrestamoController {

	private @Autowired IConsultaPrestamosService consultaPrestamosService;
	

	@GetMapping(params = "accion=buscarTodos")
	public List<PrestamoRecurso> buscarTodos() {
		return consultaPrestamosService.buscarTodos();
	}
	
	//Agrege esto para hacer la consulta segun las aulas de estudio
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<PrestamoRecurso> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda) {
		return consultaPrestamosService.buscarPorCriterio(criterioBusqueda);
	}
}
