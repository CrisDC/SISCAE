package pe.edu.unmsm.fisi.siscae.controller.consulta.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.consulta.InfraccionDetalle;
import pe.edu.unmsm.fisi.siscae.model.criterio.InfraccionDetalleCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IInfraccionDetalleService;

@RequestMapping("/infraccionDetalle")
public @RestController class InfraccionDetalleController {

	private @Autowired IInfraccionDetalleService infraccionDetalleService;
	
	@GetMapping(params = "accion=buscarTodos")
	public List<InfraccionDetalle> buscarTodos() {
		return infraccionDetalleService.buscarTodos();
	}

	@GetMapping(params = "accion=buscarPorCriterio")
	public List<InfraccionDetalle> buscarPorCriterio(InfraccionDetalleCriterioBusqueda criterioBusqueda) {
		
		System.out.println(criterioBusqueda);
		
		return infraccionDetalleService.buscarPorCriterio(criterioBusqueda);
	}
	
}
