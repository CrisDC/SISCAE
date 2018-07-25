package pe.edu.unmsm.fisi.siscae.controller.consultas;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;

@Vista
@Audit(accion = Accion.Visita, comentario = Comentario.VisitaConsulta)
public @Controller class ConsultaPublicaTramiteController
{
    @Audit(tipo = Tipo.ConMovLib)
    @GetMapping(value = "/{consulta:consultaDocumentos}")
    public String irPaginaConsultaTxnsLiberadas(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        model.addAttribute("hasDetalle", false);
        model.addAttribute("hasComision", false);
        model.addAttribute("hasComisionAutorizada", false);
        return "seguras/consulta/movimiento";
    }

}
