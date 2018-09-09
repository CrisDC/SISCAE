package pe.edu.unmsm.fisi.siscae.controller.reporte;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;

@Vista
@Audit(accion = Accion.Visita, comentario = Comentario.Visita)
@RequestMapping("/reporte")
public @Controller class ReporteController
{
 
    private @Autowired IMultiTabDetService multiTabDetService;
    
    /*
    @Audit(tipo = Tipo.RptComisCuadre)
    @GetMapping("/resumen/{reporte:comisionInstResumen}")
    public String irPaginaReporteComisionBancoAdministrador(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteResumen";
    }*/

   
}