package pe.edu.unmsm.fisi.siscae.controller.consulta.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaInfracciones;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Sancionado;
import pe.edu.unmsm.fisi.siscae.service.IPrestamoDetalle2Service;
import pe.edu.unmsm.fisi.siscae.service.ISancionadoService;

@RequestMapping("/Sancionados")
public @RestController class SancionadosController {

	private @Autowired ISancionadoService sancionadoService;
	
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<Sancionado> buscarPorCriterio(ConsultaInfracciones criterioBusqueda){
		System.out.println(criterioBusqueda);
		
		return sancionadoService.buscarPorCriterio(criterioBusqueda);
	}
	
}
