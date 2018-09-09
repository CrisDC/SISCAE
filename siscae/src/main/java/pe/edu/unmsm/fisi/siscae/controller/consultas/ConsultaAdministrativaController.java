package pe.edu.unmsm.fisi.siscae.controller.consultas;

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
@RequestMapping("/consulta/administrativa")
public @Controller class ConsultaAdministrativaController
{

    /*Consultas Debito*/

    @Audit(tipo = Tipo.CON_ADM_ALUMNO)
    @GetMapping("/{consulta:alumno}")
    public String irPaginaConsultaAdministrativaAtm(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }
    
    
}