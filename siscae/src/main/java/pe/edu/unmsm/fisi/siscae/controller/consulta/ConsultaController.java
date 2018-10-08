package pe.edu.unmsm.fisi.siscae.controller.consulta;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.configuracion.security.SecurityContextFacade;
import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecurso;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.service.IAreaAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosService;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;

@Vista
@Audit(accion = Accion.Visita, comentario = Comentario.VisitaConsulta)
@RequestMapping("/movimiento")
public @Controller class ConsultaController {
	private static final String CONSULTA_MOVIMIENTOS = "seguras/movimiento/";
	private static final String CONSULTA_ESTADO_AREA = CONSULTA_MOVIMIENTOS + "estadoArea";
	private static final String CONSULTA_INFRACCIONES = CONSULTA_MOVIMIENTOS + "infracciones";
	private static final String CONSULTA_SOLICITANTES = CONSULTA_MOVIMIENTOS + "solicitantes";
	private static final String CONSULTA_ESTADISTICAS = CONSULTA_MOVIMIENTOS + "estadisticas";
	
	private static final Integer ID_TABLA_INFRACCION = 2;

	private @Autowired IConsultaPrestamosService consultaPrestamosService;
	private @Autowired IUsuarioService usuarioService;
	private @Autowired IAreaAdministrativoService areaAdministrativoService;
	private @Autowired IMultiTabDetService multiTabDetService;

	@Audit(tipo = Tipo.CON_MOV_ESTADO_AREA)
	@GetMapping("/{consulta:estadoArea}")
	public String irPaginaConsultaPrestamosEstadoArea(@PathVariable String consulta, ModelMap model) {

		List<Usuario> listaUsuario = usuarioService.buscarTodos();
		Usuario usuario = null;
		for (int i = 0; i < listaUsuario.size(); i++) {
			if (listaUsuario.get(i).getIdUsuario() == SecurityContextFacade.getAuthenticatedUser().getIdUsuario()) {
				usuario = listaUsuario.get(i);
			}
		}
		
		AreaAdministrativo areaAdministrativo = null;
		List<AreaAdministrativo> listaAreaAdministrativo = areaAdministrativoService.buscarTodos();
		for (int i = 0; i < listaAreaAdministrativo.size(); i++) {
			if (listaAreaAdministrativo.get(i).getIdAdministrativo() == usuario.getIdPersona()) {
				areaAdministrativo = listaAreaAdministrativo.get(i);
			}
		}

		ConsultaPrestamosCriterioBusqueda criterioBusqueda = new ConsultaPrestamosCriterioBusqueda();
		criterioBusqueda.setAreaEstudio(areaAdministrativo.getNombreAreaEstudio());

		model.addAttribute("prestamos", consultaPrestamosService.buscarPorCriterio(criterioBusqueda));
		model.addAttribute("consulta", consulta);
		model.addAttribute("areaAdministrativo", areaAdministrativo);
		return CONSULTA_ESTADO_AREA;
	}

	@Audit(tipo = Tipo.CON_MOV_SOLICITANTES)
	@GetMapping("/{consulta:solicitantes}")
	public String irPaginaConsultaNuevos(@PathVariable String consulta, ModelMap model) {
		
		
		ArrayList<Usuario> listaUsuario = (ArrayList) usuarioService.buscarTodos();
		Usuario usuario = null;
		for (int i = 0; i < listaUsuario.size(); i++) {
			if (listaUsuario.get(i).getIdUsuario() == SecurityContextFacade.getAuthenticatedUser().getIdUsuario()) {
				usuario = listaUsuario.get(i);
			}
		}

		ArrayList<AreaAdministrativo> listaAreaAdministrativo = (ArrayList) areaAdministrativoService.buscarTodos();
		AreaAdministrativo areaAdministrativo = null;	
		for (int i = 0; i < listaAreaAdministrativo.size(); i++) {
			if (listaAreaAdministrativo.get(i).getIdAdministrativo() == usuario.getIdPersona()) {
				areaAdministrativo = listaAreaAdministrativo.get(i);
			}
		}

		model.addAttribute("consulta", consulta);
		model.addAttribute("areaAdministrativo", areaAdministrativo);
		
		return CONSULTA_SOLICITANTES;
	}

	@Audit(tipo = Tipo.CON_MOV_INFRACCIONES)
	@GetMapping("/{consulta:infracciones}")
	public String irPaginaConsultaInfracciones(@PathVariable String consulta, ModelMap model) {
		
		Usuario usuario = null;
		List<Usuario> listaUsuario = usuarioService.buscarTodos();
		for (int i = 0; i < listaUsuario.size(); i++) {
			if (listaUsuario.get(i).getIdUsuario() == SecurityContextFacade.getAuthenticatedUser().getIdUsuario()) {
				usuario = listaUsuario.get(i);
				break;
			}
		}

		AreaAdministrativo areaAdministrativo = null;
		List<AreaAdministrativo> listaAreaAdministrativo = areaAdministrativoService.buscarTodos();
		for (int i = 0; i < listaAreaAdministrativo.size(); i++) {
			if (listaAreaAdministrativo.get(i).getIdAdministrativo() == usuario.getIdPersona()) {
				areaAdministrativo = listaAreaAdministrativo.get(i);
				break;
			}
		}
		
		ConsultaPrestamosCriterioBusqueda criterioBusqueda = new ConsultaPrestamosCriterioBusqueda();
		criterioBusqueda.setAreaEstudio(areaAdministrativo.getNombreAreaEstudio());
		
		List<PrestamoRecurso> prestamos = consultaPrestamosService.buscarPorCriterio(criterioBusqueda);
		
		List<MultiTabDet> tiposInfracciones = multiTabDetService.buscarPorIdTabla(ID_TABLA_INFRACCION);
		
		model.addAttribute("prestamos", prestamos);
		model.addAttribute("areaAdministrativo", areaAdministrativo);
		model.addAttribute("tipoInfracciones", tiposInfracciones);
		model.addAttribute("consulta", consulta);
		return CONSULTA_INFRACCIONES;
	}

	@Audit(tipo = Tipo.CON_MOV_ESTADISTICAS)
	@GetMapping("/{consulta:estadisticas}")
	public String irPaginaConsultaEstadisticas(@PathVariable String consulta, ModelMap model) {
		System.out.println(SecurityContextFacade.getAuthenticatedUser());
		int idAdministrativo = 3;
		AreaAdministrativo areaAdministrativo = null;

		ArrayList<AreaAdministrativo> listaAreaAdministrativo = (ArrayList) areaAdministrativoService.buscarTodos();
		for (int i = 0; i < listaAreaAdministrativo.size(); i++) {
			if (listaAreaAdministrativo.get(i).getIdAdministrativo() == idAdministrativo) {
				areaAdministrativo = listaAreaAdministrativo.get(i);
			}
		}
		ConsultaPrestamosCriterioBusqueda criterioBusqueda = new ConsultaPrestamosCriterioBusqueda();
		criterioBusqueda.setAreaEstudio(areaAdministrativo.getNombreAreaEstudio());
		model.addAttribute("consulta", consulta);
		model.addAttribute("areaAdministrativo", areaAdministrativo);
		return CONSULTA_ESTADISTICAS;
	}

}