package pe.edu.unmsm.fisi.siscae.controller.consulta.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaSancionados;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaSancionadosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaSancionadosService;

@RequestMapping("/consultaSancionados")
public @RestController class ConsultaSancionadosController {

	private @Autowired IConsultaSancionadosService ConsultaSancionadosService;

	@GetMapping(params = "accion=buscarTodos")
	public List<ConsultaSancionados> buscarTodos() {
		return ConsultaSancionadosService.buscarTodos();
	}

	// Agregue esto para hacer la consulta segun las aulas de estudio
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ConsultaSancionados> buscarPorCriterio(ConsultaSancionadosCriterioBusqueda criterioBusqueda) {
		return ConsultaSancionadosService.buscarPorCriterio(criterioBusqueda);
	}

	// Agregue esto para hacer la consulta segun las aulas de estudio
	@GetMapping(params = "accion=buscarPorCriterio2")
	public List<ConsultaSancionados> buscarPorCriterio2(ConsultaSancionadosCriterioBusqueda criterioBusqueda,
			ConsultaSancionadosCriterioBusqueda criterioBusqueda2) {
		return ConsultaSancionadosService.buscarPorCriterio(criterioBusqueda);
	}
}

