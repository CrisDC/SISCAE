package pe.edu.unmsm.fisi.siscae.controller.consulta.rest;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecursoTabla;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosTablaService;


@RequestMapping("/consultaPrestamosTabla")
public @RestController class ConsultaPrestamosTablaController {

	private @Autowired IConsultaPrestamosTablaService ConsultaPrestamosTablasService;

	@GetMapping(params = "accion=buscarTodos")
	public List<PrestamoRecursoTabla> buscarTodos() {
		return ConsultaPrestamosTablasService.buscarTodos();
	}

	// Agrege esto para hacer la consulta segun las aulas de estudio
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<PrestamoRecursoTabla> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda) {
		return ConsultaPrestamosTablasService.buscarPorCriterio(criterioBusqueda);
	}

	// Agrege esto para hacer la consulta segun las aulas de estudio
	@GetMapping(params = "accion=buscarPorCriterio2")
	public List<PrestamoRecursoTabla> buscarPorCriterio2(ConsultaPrestamosCriterioBusqueda criterioBusqueda,
			ConsultaPrestamosCriterioBusqueda criterioBusqueda2) {
		return ConsultaPrestamosTablasService.buscarPorCriterio(criterioBusqueda);
	}
}
