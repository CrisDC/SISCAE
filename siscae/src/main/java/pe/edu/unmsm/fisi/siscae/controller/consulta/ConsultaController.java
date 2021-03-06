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
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaSancionados;
import pe.edu.unmsm.fisi.siscae.model.consulta.InfraccionDetalle;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecurso;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecursoTabla;
import pe.edu.unmsm.fisi.siscae.model.consulta.SolicitantesDetalles;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaAdministrativoCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Escuela;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabCab;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.service.IAreaAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.IConsultaAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosService;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosTablaService;
import pe.edu.unmsm.fisi.siscae.service.IConsultaSancionadosService;
import pe.edu.unmsm.fisi.siscae.service.IEscuelaService;
import pe.edu.unmsm.fisi.siscae.service.IEstadoTablaService;
import pe.edu.unmsm.fisi.siscae.service.IInfraccionDetalleService;
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

	private @Autowired IInfraccionDetalleService infraccionDetalleService;
	private @Autowired IConsultaPrestamosService consultaPrestamosService;
	private @Autowired IConsultaSancionadosService consultaSancionadosService;
	private @Autowired IConsultaPrestamosTablaService consultaPrestamosTablaService;
	private @Autowired IUsuarioService usuarioService;
	private @Autowired IAreaAdministrativoService areaAdministrativoService;
	private @Autowired IMultiTabDetService multiTabDetService;
	private @Autowired IMultiTabCabService multiTabCabService;
	private @Autowired ISolicitantesDetallesService solicitantesDetallesService;
	private @Autowired IConsultaAdministrativoService consultaAdministrativoService; 
	private @Autowired IEstadoTablaService estadoTablasService;  // ANGEL
	
	private @Autowired IEscuelaService escuelaService;

	@Audit(tipo = Tipo.CON_MOV_ESTADO_AREA)
	@GetMapping("/{consulta:estadoArea}")
	public String irPaginaConsultaPrestamosEstadoArea(@PathVariable String consulta, ModelMap model) {
		
		
		ConsultaAdministrativoCriterioBusqueda criterioBusqueda2 = new ConsultaAdministrativoCriterioBusqueda();
		criterioBusqueda2.setUsuario(SecurityContextFacade.obtenerNombreUsuario());
		
		List<ConsultaAdministrativo> listaAdministrativoUsuario = consultaAdministrativoService.buscarPorCriterio(criterioBusqueda2);
		
		ConsultaPrestamosCriterioBusqueda criterioBusqueda = new ConsultaPrestamosCriterioBusqueda();
		criterioBusqueda.setAreaEstudio(listaAdministrativoUsuario.get(0).getAreaEstudio());
		
		List<PrestamoRecurso> listaRecursos = consultaPrestamosService.buscarPorCriterio(criterioBusqueda);
		
		
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
		model.addAttribute("areaAdministrativo", listaAdministrativoUsuario.get(0));
		model.addAttribute("existenGrupales", existenGrupales);
		model.addAttribute("existenIndividuales", existenIndividuales);
		return CONSULTA_ESTADO_AREA;
	}

	@Audit(tipo = Tipo.CON_MOV_SOLICITANTES)
	@GetMapping("/{consulta:solicitantes}")
	public String irPaginaConsultaNuevos(@PathVariable String consulta, ModelMap model) {
		
		ConsultaAdministrativoCriterioBusqueda criterioBusqueda2 = new ConsultaAdministrativoCriterioBusqueda();
		criterioBusqueda2.setUsuario(SecurityContextFacade.obtenerNombreUsuario());
		
		List<ConsultaAdministrativo> listaAdministrativoUsuario = consultaAdministrativoService.buscarPorCriterio(criterioBusqueda2);
				
		
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
		
		
		model.addAttribute("tipoDocumentos", listaTipoDocumento);
		model.addAttribute("tipoAcademicos", listaTipoAcademico);
		model.addAttribute("escuelas", listaEscuelas);
		model.addAttribute("areaAdministrativo", listaAdministrativoUsuario.get(0));
		
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
		ConsultaAdministrativoCriterioBusqueda criterioBusqueda2 = new ConsultaAdministrativoCriterioBusqueda();
		criterioBusqueda2.setUsuario(SecurityContextFacade.obtenerNombreUsuario());
		List<ConsultaAdministrativo> listaAdministrativoUsuario = consultaAdministrativoService.buscarPorCriterio(criterioBusqueda2);
		
		ConsultaPrestamosCriterioBusqueda criterioBusqueda = new ConsultaPrestamosCriterioBusqueda();
		criterioBusqueda.setAreaEstudio(listaAdministrativoUsuario.get(0).getAreaEstudio());
		
		List<PrestamoRecursoTabla> listaRecursosTabla = consultaPrestamosTablaService.buscarPorCriterio(criterioBusqueda);
		
		List<PrestamoRecursoTabla> listaRecursosIndividuales = new ArrayList<>();
		List<PrestamoRecursoTabla> listaRecursosGrupales = new ArrayList<>();
		int existenGrupales=0;
		int existenIndividuales=0;
		int ocupadoi =0;
		int ocupadog =0;
		
		for(int i=0;i<listaRecursosTabla.size();i++){
			if(listaRecursosTabla.get(i).getMaxCapacidad()==1){
				listaRecursosIndividuales.add(listaRecursosTabla.get(i));			
			}else{
				listaRecursosGrupales.add(listaRecursosTabla.get(i));
			}
		}
		
		int cont;
		for(int i=0;i<listaRecursosGrupales.size();i++){
			cont=1;
			for(int j=0;j<listaRecursosTabla.size();j++){
				if(listaRecursosGrupales.get(i).getIdRecurso()==listaRecursosTabla.get(j).getIdRecurso()){
					listaRecursosTabla.get(j).setOrden(cont);
					cont++;
				}
			}
		}
		Collections.sort(listaRecursosIndividuales);
		Collections.sort(listaRecursosGrupales); 
		if(listaRecursosIndividuales.size()!=0){
			int i =0;
			while(ocupadoi==0 && i<listaRecursosIndividuales.size() ) {
				if(listaRecursosIndividuales.get(i).getEstado().equals("OCUPADO")) {
					ocupadoi=1;
				}
				i++;
			}
			existenIndividuales=1;
		}
		if(listaRecursosGrupales.size()!=0){
			int i =0;
			while(ocupadog==0 && i<listaRecursosGrupales.size() ) {
				if(listaRecursosGrupales.get(i).getEstado().equals("OCUPADO")) {
					ocupadog=1;
				}
				i++;
			}
			existenGrupales=1;
		}
		
		List<InfraccionDetalle> infraccionesDetalle = infraccionDetalleService.buscarTodos();
		List<ConsultaSancionados> sancionados =new ArrayList<ConsultaSancionados>();
		sancionados=consultaSancionadosService.buscarTodos();
		int existenSancionados=0;
		try {
			if(sancionados.size()!=0) {
				if(sancionados.get(0).getDocIdentificador()!=null && sancionados.size()>0){
					existenSancionados=1;
				}
			}
			
		}
		catch(NullPointerException e){
			existenSancionados=0;
		}
		List<MultiTabDet> tiposInfracciones = multiTabDetService.buscarPorIdTabla(ID_TABLA_INFRACCION);
		
		
		
		model.addAttribute("prestamos", listaRecursosIndividuales);
		model.addAttribute("recursosGrupales", listaRecursosGrupales);
		model.addAttribute("infraccionesDetalle", infraccionesDetalle);
		model.addAttribute("sancionados", sancionados);
		model.addAttribute("existenSancionados", existenSancionados);
		model.addAttribute("areaAdministrativo", listaAdministrativoUsuario.get(0));
		model.addAttribute("tipoInfracciones", tiposInfracciones);
		model.addAttribute("estadosI", estadoTablasService.buscarporTablaOrigen("MOV_INFRACCION")); //ANGEL
		model.addAttribute("consulta", consulta);
		model.addAttribute("existenGrupales", existenGrupales);
		model.addAttribute("existenIndividuales", existenIndividuales);
		model.addAttribute("ocupadoi", ocupadoi);
		model.addAttribute("ocupadog", ocupadog);
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