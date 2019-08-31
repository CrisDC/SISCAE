package pe.edu.unmsm.fisi.siscae.controller.consulta.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoDetalle2;
import pe.edu.unmsm.fisi.siscae.model.criterio.PrestamoDetalle2CriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IPrestamoDetalle2Service;

@RequestMapping("/PrestamoDetalle2")
public @RestController class PrestamoDetalle2Controller {

	private @Autowired IPrestamoDetalle2Service prestamoDetalle2Service; 
	
	
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<PrestamoDetalle2> buscarPorCriterio(PrestamoDetalle2CriterioBusqueda criterioBusqueda) {
		System.out.println(criterioBusqueda);
		
		return prestamoDetalle2Service.buscarPorCriterio(criterioBusqueda);
	}
	
	
	
}
