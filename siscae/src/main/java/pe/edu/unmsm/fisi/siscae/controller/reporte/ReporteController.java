package pe.edu.unmsm.fisi.siscae.controller.reporte;

import java.util.ArrayList;

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
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;
import pe.edu.unmsm.fisi.siscae.service.IAreaAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;

@Vista
@Audit(accion = Accion.Visita, comentario = Comentario.Visita)
@RequestMapping("/reporte")
public @Controller class ReporteController
{
 
	private static final String REPORTE = "seguras/reporte/";
	private static final String REPORTE_ESTADISTICAS = REPORTE + "estadisticas";
	
    private @Autowired IMultiTabDetService multiTabDetService;
	private @Autowired IAreaAdministrativoService areaAdministrativoService;
    
    @Audit(tipo = Tipo.REP_EST_PRESTAMOS)
   	@GetMapping("/estadisticas/{reporte:prestamos}/{criterio:escuela}")
   	public String irPaginaConsultaEstadisticas(@PathVariable String reporte, @PathVariable String criterio, ModelMap model) {
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
   		model.addAttribute("reporte", reporte);
   		model.addAttribute("criterio", criterio);
   		model.addAttribute("areaAdministrativo", areaAdministrativo);
   		return REPORTE_ESTADISTICAS;
   	}
   
}