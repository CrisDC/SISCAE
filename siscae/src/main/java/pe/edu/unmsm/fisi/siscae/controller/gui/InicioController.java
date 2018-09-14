package pe.edu.unmsm.fisi.siscae.controller.gui;

import java.security.Principal;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso;
import pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento.RecursoService;

@Vista
public @Controller class InicioController {
	
	@GetMapping("/inicioS")
	public String irPaginaInicio() {
		/*RecursoService rs = new RecursoService(null);
		List<Recurso> listaRecurso = rs.buscarTodos();
		System.out.println(listaRecurso.get(0).getNumeroSerie());*/
		return "template/fragments/guiuser/inicio";
	}

}
