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

    @Audit(tipo = Tipo.ConAdminAtm)
    @GetMapping("/{consulta:atm}")
    public String irPaginaConsultaAdministrativaAtm(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }
    
    @Audit(tipo = Tipo.ConAdminAg)
    @GetMapping("/{consulta:agencia}")
    public String irPaginaConsultaAdministrativaAgencia(@PathVariable String consulta,
            ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }

    @Audit(tipo = Tipo.ConAdminCliente)
    @GetMapping("/{consulta:clientePersona}")
    public String irPaginaConsultaAdministrativaCliente(@PathVariable String consulta,
            ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }

    @Audit(tipo = Tipo.ConAdminCta)
    @GetMapping("/{consulta:cuenta}")
    public String irPaginaConsultaAdministrativaCuenta(@PathVariable String consulta,
            ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }

    @Audit(tipo = Tipo.ConAdminTarjeta)
    @GetMapping("/{consulta:tarjeta}")
    public String irPaginaConsultaAdministrativaTarjeta(@PathVariable String consulta,
            ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }

    /*Consultas Prepago*/
    
    @Audit(tipo = Tipo.ConAdminPersonaPP)
    @GetMapping("/{consulta:personaPP}")
    public String irPaginaConsultaAdministrativaPersonaPP(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }
    
    @Audit(tipo = Tipo.ConAdminTarjetaPP)
    @GetMapping("/{consulta:tarjetaPP}")
    public String irPaginaConsultaAdministrativaTarjetaPP(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }
    
    @Audit(tipo = Tipo.ConAdminCuentaPP)
    @GetMapping("/{consulta:cuentaPP}")
    public String irPaginaConsultaAdministrativaCuentaPP(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }
    
    @Audit(tipo = Tipo.ConAdminLotePP)
    @GetMapping("/{consulta:lotePP}")
    public String irPaginaConsultaAdministrativaLotePP(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }
    
    @Audit(tipo = Tipo.ConAdminRecargaPP)
    @GetMapping("/{consulta:recargaPP}")
    public String irPaginaConsultaAdministrativaRecargaPP(@PathVariable String consulta, ModelMap model)
    {
        model.addAttribute("consulta", consulta);
        return "seguras/consulta/administrativa";
    }
    
    
    
}