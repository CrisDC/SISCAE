package pe.edu.unmsm.fisi.siscae.controller.consulta;

import java.util.ArrayList;
import java.util.Collections;
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
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecursoTabla;
import pe.edu.unmsm.fisi.siscae.model.consulta.SolicitantesDetalles;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Escuela;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabCab;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.service.IAreaAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosService;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosTablaService;
import pe.edu.unmsm.fisi.siscae.service.IEscuelaService;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabCabService;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;
import pe.edu.unmsm.fisi.siscae.service.ISolicitantesDetallesService;
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
	private @Autowired IConsultaPrestamosTablaService consultaPrestamosTablaService;
	private @Autowired IUsuarioService usuarioService;
	private @Autowired IAreaAdministrativoService areaAdministrativoService;
	private @Autowired IMultiTabDetService multiTabDetService;
	private @Autowired IMultiTabCabService multiTabCabService;
	private @Autowired ISolicitantesDetallesService solicitantesDetallesService;
	
	private @Autowired IEscuelaService escuelaService;

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
			if (listaAreaAdministrativo.get(i).getIdAdministrativo().equals(usuario.getIdPersona())) {
				areaAdministrativo = listaAreaAdministrativo.get(i);
			}
		}

		ConsultaPrestamosCriterioBusqueda criterioBusqueda = new ConsultaPrestamosCriterioBusqueda();
		criterioBusqueda.setAreaEstudio(areaAdministrativo.getNombreAreaEstudio());
		
		List<PrestamoRecurso> listaRecursos = consultaPrestamosService.buscarPorCriterio(criterioBusqueda);
		List<PrestamoRecursoTabla> listaRecursosTabla = consultaPrestamosTablaService.buscarPorCriterio(criterioBusqueda);
		
		List<PrestamoRecurso> listaRecursosIndividuales = new ArrayList<>();
		List<PrestamoRecurso> listaRecursosGrupales = new ArrayList<>();
		int existenGrupales=0;
		int existenIndividuales=0;
		
		for(int i=0;i<listaRecursos.size();i++){
			if(listaRecursos.get(i).getMaxCapacidad()==1){
				listaRecursosIndividuales.add(listaRecursos.get(i));			
			}else{
				listaRecursosGrupales.add(listaRecursos.get(i));
			}
		}
		Collections.sort(listaRecursosIndividuales);
		Collections.sort(listaRecursosGrupales); 
		if(listaRecursosIndividuales.size()!=0){
			existenIndividuales=1;
		}
		if(listaRecursosGrupales.size()!=0){
			existenGrupales=1;
		}
		model.addAttribute("recursosIndividuales", listaRecursosIndividuales);
		model.addAttribute("recursosGrupales", listaRecursosGrupales);
		model.addAttribute("recursosTabla", listaRecursosTabla);
		model.addAttribute("consulta", consulta);
		model.addAttribute("areaAdministrativo", areaAdministrativo);
		model.addAttribute("existenGrupales", existenGrupales);
		model.addAttribute("existenIndividuales", existenIndividuales);
		return CONSULTA_ESTADO_AREA;
	}

	@Audit(tipo = Tipo.CON_MOV_SOLICITANTES)
	@GetMapping("/{consulta:solicitantes}")
	public String irPaginaConsultaNuevos(@PathVariable String consulta, ModelMap model) {
		
		//Busqueda del usuario - PROVISIONAL
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
		
		
		//Cargando elementos a los combos
		ArrayList<MultiTabCab> listaMultiCab = (ArrayList) multiTabCabService.buscarTodos();
		MultiTabCab multiTabCab = null;
		for (int i = 0; i < listaMultiCab.size(); i++) {
			if (listaMultiCab.get(i).getNombre().equals("TIPO DOCUMENTO")) {
				multiTabCab = listaMultiCab.get(i);
			}
		}
		ArrayList<MultiTabDet> listaTipoDocumento = (ArrayList) multiTabDetService.buscarPorIdTabla(multiTabCab.getIdTabla());
		
		
		ArrayList<MultiTabCab> listaMultiCab2 = (ArrayList) multiTabCabService.buscarTodos();
		MultiTabCab multiTabCab2 = null;
		for (int i = 0; i < listaMultiCab2.size(); i++) {
			if (listaMultiCab2.get(i).getNombre().equals("TIPO ACADEMICO")) {
				multiTabCab2 = listaMultiCab2.get(i);
			}
		}
		ArrayList<MultiTabDet> listaTipoAcademico = (ArrayList) multiTabDetService.buscarPorIdTabla(multiTabCab2.getIdTabla());
		
		
		ArrayList<Escuela> listaEscuelas = (ArrayList) escuelaService.buscarTodos();
		
		ArrayList<SolicitantesDetalles> listaSolicitantes = (ArrayList) solicitantesDetallesService.buscarTodos();
		
		model.addAttribute("tipoDocumentos", listaTipoDocumento);
		model.addAttribute("tipoAcademicos", listaTipoAcademico);
		model.addAttribute("escuelas", listaEscuelas);
		model.addAttribute("solicitantes", listaSolicitantes);
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
		
		List<PrestamoRecursoTabla> prestamos = consultaPrestamosTablaService.buscarPorCriterio(criterioBusqueda);
		
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