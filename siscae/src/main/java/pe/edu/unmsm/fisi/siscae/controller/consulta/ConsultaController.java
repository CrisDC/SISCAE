package pe.edu.unmsm.fisi.siscae.controller.consulta;

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
import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosService;

@Vista
@Audit(accion = Accion.Visita, comentario = Comentario.VisitaConsulta)
@RequestMapping("/movimiento")
public @Controller class ConsultaController
{
	private static final String CONSULTA_MOVIMIENTOS = "seguras/movimiento/";
	private static final String CONSULTA_ESTADO_AREA = CONSULTA_MOVIMIENTOS + "estadoArea";
	private static final String CONSULTA_INFRACCIONES = CONSULTA_MOVIMIENTOS + "infracciones";
	private static final String CONSULTA_NUEVOS_SOLICITANTES = CONSULTA_MOVIMIENTOS + "nuevosSolicitantes";
	
	private @Autowired IConsultaPrestamosService consultaPrestamosService;

	
    @Audit(tipo = Tipo.CON_MOV_ESTADO_AREA)
    @GetMapping("/{consulta:estadoArea}")
    public String irPaginaConsultaPrestamosEstadoArea(@PathVariable String consulta, ModelMap model)
    {
    	ConsultaPrestamosCriterioBusqueda criterioBusqueda = new ConsultaPrestamosCriterioBusqueda();
    	criterioBusqueda.setAreaEstudio("BIBLIOTECA");
    	model.addAttribute("prestamos",  consultaPrestamosService.buscarPorCriterio(criterioBusqueda));
    	model.addAttribute("consulta", consulta);
        return CONSULTA_ESTADO_AREA;
    }
    
    @Audit(tipo = Tipo.CON_MOV_NUEVOS_SOLICITANTES)
    @GetMapping("/{consulta:nuevosSolicitantes}")
    public String irPaginaConsultaNuevos(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return CONSULTA_NUEVOS_SOLICITANTES;
    }
    
    
    @Audit(tipo = Tipo.CON_MOV_INFRACCIONES)
    @GetMapping("/{consulta:infracciones}")
    public String irPaginaConsultaInfracciones(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return CONSULTA_INFRACCIONES;
    }
    
    
}