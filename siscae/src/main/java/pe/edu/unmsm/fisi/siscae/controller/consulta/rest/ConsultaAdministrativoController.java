package pe.edu.unmsm.fisi.siscae.controller.consulta.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaAdministrativoCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaAdministrativoService;

@RequestMapping("/consultaAdministrativo")
public @RestController class ConsultaAdministrativoController {

	private @Autowired IConsultaAdministrativoService consultaAdministrativoService;

	@GetMapping(params = "accion=buscarTodos")
	public List<ConsultaAdministrativo> buscarTodos() {
		return consultaAdministrativoService.buscarTodos();
	}

	// Agregue esto para hacer la consulta segun las aulas de estudio
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ConsultaAdministrativo> buscarPorCriterio(ConsultaAdministrativoCriterioBusqueda criterioBusqueda) {
		return consultaAdministrativoService.buscarPorCriterio(criterioBusqueda);
	}

	// Agregue esto para hacer la consulta segun las aulas de estudio
	@GetMapping(params = "accion=buscarPorCriterio2")
	public List<ConsultaAdministrativo> buscarPorCriterio2(ConsultaAdministrativoCriterioBusqueda criterioBusqueda,
			ConsultaAdministrativoCriterioBusqueda criterioBusqueda2) {
		return consultaAdministrativoService.buscarPorCriterio(criterioBusqueda);
	}
}

