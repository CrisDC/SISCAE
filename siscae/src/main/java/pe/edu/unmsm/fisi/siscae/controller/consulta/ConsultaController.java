package pe.edu.unmsm.fisi.siscae.controller.consulta;

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

@Vista
@Audit(accion = Accion.Visita, comentario = Comentario.VisitaConsulta)
@RequestMapping("/consulta/movimientos")
public @Controller class ConsultaController
{
	private static final String CONSULTA_MOVIMIENTOS = "seguras/consulta/movimientos/";
	private static final String CONSULTA_PRESTAMO = CONSULTA_MOVIMIENTOS + "prestamo";
	private static final String CONSULTA_INFRACCIONES = CONSULTA_MOVIMIENTOS + "infracciones";
	
    @Audit(tipo = Tipo.CON_MOV_PRESTAMO)
    @GetMapping("/{consulta:prestamo}")
    public String irPaginaConsultaPrestamos(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return CONSULTA_PRESTAMO;
    }
    
    @Audit(tipo = Tipo.CON_MOV_INFRACCIONES)
    @GetMapping("/{consulta:infracciones}")
    public String irPaginaConsultaInfracciones(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return CONSULTA_INFRACCIONES;
    }
    
    
}