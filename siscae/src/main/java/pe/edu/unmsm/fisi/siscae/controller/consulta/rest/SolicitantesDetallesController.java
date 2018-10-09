package pe.edu.unmsm.fisi.siscae.controller.consulta.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.consulta.SolicitantesDetalles;
import pe.edu.unmsm.fisi.siscae.model.criterio.SolicitantesDetallesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.ISolicitantesDetallesService;

@RequestMapping("/solicitantesDetalles")
public @RestController class SolicitantesDetallesController {

	private @Autowired ISolicitantesDetallesService SolicitantesDetallesService;
	

	@GetMapping(params = "accion=buscarTodos")
	public List<SolicitantesDetalles> buscarTodos() {
		return SolicitantesDetallesService.buscarTodos();
	}
	
	//Agrege esto para hacer la consulta segun las aulas de estudio
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<SolicitantesDetalles> buscarPorCriterio(SolicitantesDetallesCriterioBusqueda criterioBusqueda) {
		return SolicitantesDetallesService.buscarPorCriterio(criterioBusqueda);
	}
}

