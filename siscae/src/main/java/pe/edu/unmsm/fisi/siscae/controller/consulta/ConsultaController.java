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
@RequestMapping("/consulta/movimientos")
public @Controller class ConsultaController
{
	private static final String CONSULTA_MOVIMIENTOS = "seguras/consulta/movimientos/";
	private static final String CONSULTA_PRESTAMO = CONSULTA_MOVIMIENTOS + "prestamo";
	private static final String CONSULTA_INFRACCIONES = CONSULTA_MOVIMIENTOS + "infracciones";
	private static final String CONSULTA_NUEVOS = CONSULTA_MOVIMIENTOS + "nuevos";
	private static final String CONSULTA_REGISTRO = CONSULTA_MOVIMIENTOS + "registro";
	
	private @Autowired IConsultaPrestamosService consultaPrestamosService;

	
    @Audit(tipo = Tipo.CON_MOV_PRESTAMO)
    @GetMapping("/{consulta:prestamo}")
    public String irPaginaConsultaPrestamos(@PathVariable String consulta, ModelMap model)
    {
    	//model.addAttribute("prestamos",  consultaPrestamosService.buscarTodos());
    	ConsultaPrestamosCriterioBusqueda criterioBusqueda = new ConsultaPrestamosCriterioBusqueda();
    	criterioBusqueda.setAreaEstudio("BIBLIOTECA");
    	model.addAttribute("prestamos",  consultaPrestamosService.buscarPorCriterio(criterioBusqueda));
    	model.addAttribute("consulta", consulta);
        return CONSULTA_PRESTAMO;
    }
    
    @Audit(tipo = Tipo.CON_MOV_NUEVOS)
    @GetMapping("/{consulta:nuevos}")
    public String irPaginaConsultaNuevos(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return CONSULTA_NUEVOS;
    }
    
    @Audit(tipo = Tipo.CON_MOV_REGISTRO)
    @GetMapping("/{consulta:registro}")
    public String irPaginaConsultaRegistro(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return CONSULTA_REGISTRO;
    }
    
    @Audit(tipo = Tipo.CON_MOV_INFRACCIONES)
    @GetMapping("/{consulta:infracciones}")
    public String irPaginaConsultaInfracciones(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return CONSULTA_INFRACCIONES;
    }
    
    
}