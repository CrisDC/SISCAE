package pe.edu.unmsm.fisi.siscae.controller.mantenimiento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.service.IClienteService;
import pe.edu.unmsm.fisi.siscae.service.IEmpresaService;
import pe.edu.unmsm.fisi.siscae.service.IInstitucionService;
import pe.edu.unmsm.fisi.siscae.service.IMembresiaService;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;
import pe.edu.unmsm.fisi.siscae.utilitario.MultiTablaUtil;

@Vista
@Audit(accion = Accion.Visita, comentario = Comentario.Visita)
public @Controller class MantenimientoController
{

    private @Autowired IClienteService clienteService;
    private @Autowired IEmpresaService empresaService;
    private @Autowired IMembresiaService membresiaService;
    private @Autowired IInstitucionService institucionService;
    private @Autowired IMultiTabDetService multiTabDetService;

    @Audit(tipo = Tipo.ModoEntPos)
    @GetMapping("/{mantenimiento:recurso}")
    public String irPaginaMantenimientoRecurso(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    //Mario agrego esto
    @Audit(tipo = Tipo.ModoEntPos)
    @GetMapping("/{mantenimiento:areaEstudio}")
    public String irPaginaMantenimientoAreaEstudio(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    @Audit(tipo = Tipo.ModoEntPos)
    @GetMapping("/{mantenimiento:horario}")
    public String irPaginaMantenimientoHorario(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    // Fin de mario agrego esto
    
    
    
    @Audit(tipo = Tipo.ModoEntPos)
    @GetMapping("/{mantenimiento:modoEntradaPos}")
    public String irPaginaMantenimientoModoEntradaPos(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.ClsTxn)
    @GetMapping("/{mantenimiento:claseTransaccion}")
    public String irPaginaMantenimientoClaseTransaccion(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.Inst)
    @GetMapping("/{mantenimiento:institucion}")
    public String irPaginaMantenimientoInstitucion(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.RptaConcilUba)
    @GetMapping("/{mantenimiento:rptaConcilUba}")
    public String irPaginaMantenimientoRptaConcilUba(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.CodRptaVisa)
    @GetMapping("/{mantenimiento:codigoRptaVisa}")
    public String irPaginaMantenimientoCodigoRptaVisa(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.TiTermPos)
    @GetMapping("/{mantenimiento:tipoTerminalPos}")
    public String irPaginaMantenimientoTipoTerminalPos(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.MetIdThb)
    @GetMapping("/{mantenimiento:metodoIdThb}")
    public String irPaginaMantenimientoMetodoIdThb(@PathVariable String mantenimiento,
            ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.Origen)
    @GetMapping("/{mantenimiento:origen}")
    public String irPaginaMantenimientoOrigen(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.IndCoTel)
    @GetMapping("/{mantenimiento:indCorreoTelefono}")
    public String irPaginaMantenimientoIndCorreoTelefono(@PathVariable String mantenimiento,
            ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.CanalEmi)
    @GetMapping("/{mantenimiento:canalEmisor}")
    public String irPaginaMantenimientoCanalEmisor(@PathVariable String mantenimiento,
            ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.MotReclamo)
    @GetMapping("/{mantenimiento:motivoReclamo}")
    public String irPaginaMantenimientoMotivoReclamo(@PathVariable String mantenimiento,
            ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.Canal)
    @GetMapping("/{mantenimiento:canal}")
    public String irPaginaMantenimientoCanal(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.Memb)
    @GetMapping("/{mantenimiento:membresia}")
    public String irPaginaMantenimientoMembresia(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.Emp)
    @GetMapping("/{mantenimiento:empresa}")
    public String irPaginaMantenimientoEmpresa(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.Bin)
    @GetMapping("/{mantenimiento:bin}")
    public String irPaginaMantenimientoBIN(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("membresias", membresiaService.buscarTodos());
        model.addAttribute("institucion", institucionService.buscarPorCodigoInstitucionActual());
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.SubBin)
    @GetMapping("/{mantenimiento:subBin}")
    public String irPaginaMantenimientoSubBin(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("membresias", membresiaService.buscarTodos());
        model.addAttribute("institucion", institucionService.buscarPorCodigoInstitucionActual());
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.ClsServ)
    @GetMapping("/{mantenimiento:claseServicio}")
    public String irPaginaMantenimientoClaseServicio(@PathVariable String mantenimiento,
            ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("membresias", membresiaService.buscarTodos());
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.MulTabCab)
    @GetMapping("/multiTabCab")
    public String irPaginaMultiTabla()
    {
        return "seguras/mantenimiento/multiTabla";
    }

    @Audit(tipo = Tipo.ParamGral)
    @GetMapping("/parametroGeneral")
    public String irPaginaParametroGeneral(ModelMap model)
    {
        model.addAttribute("instituciones", institucionService.buscarTodos());
        model.addAttribute("empresas", empresaService.buscarTodos());
        return "seguras/mantenimiento/parametroGeneral";
    }

    @Audit(tipo = Tipo.Clte)
    @GetMapping("/{mantenimiento:cliente}")
    public String irPaginaMantenimientoCliente(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("empresas", empresaService.buscarTodos());
        model.addAttribute("institucion", institucionService.buscarPorCodigoInstitucionActual());
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.ContabEmi)
    @GetMapping("/{mantenimiento:cuentaContableEmisor}")
    public String irPaginaCuentaContableEmisor(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("institucion", institucionService.buscarPorCodigoInstitucionActual());
        model.addAttribute("empresas", empresaService.buscarTodos());
        model.addAttribute("clientes", clienteService.buscarTodos());
        model.addAttribute("membresias", membresiaService.buscarTodos());
        model.addAttribute("rolesTransaccion",
                multiTabDetService.buscarPorIdTabla(MultiTablaUtil.TABLA_ROL_TRANSACCION));
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.ContabRec)
    @GetMapping("/{mantenimiento:cuentaContableReceptor}")
    public String irPaginaCuentaContableReceptor(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("institucion", institucionService.buscarPorCodigoInstitucionActual());
        model.addAttribute("membresias", membresiaService.buscarTodos());

        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.RptaSw)
    @GetMapping("/{mantenimiento:codigoRptaSwitch}")
    public String irPaginaMantenimientoCodigoRptaSwitch(@PathVariable String mantenimiento,
            ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("tipoRespuestas",
                multiTabDetService.buscarPorIdTabla(MultiTablaUtil.TABLA_TIPO_RESPUESTA));
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.ProcBtec)
    @GetMapping("/{mantenimiento:codigoProcBevertec}")
    public String irPaginaMantenimientoCodigoProcBevertec(@PathVariable String mantenimiento,
            ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
     
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.TransBtec)
    @GetMapping("/{mantenimiento:codigoTxnBevertec}")
    public String irPaginaMantenimientoCodigoTxnBevertec(@PathVariable String mantenimiento,
            ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.SolicitudTramite)
    @GetMapping("/{mantenimiento:solicitudTramite}")
    public String irPaginaMantenimientoSolicitudTramite(@PathVariable String mantenimiento,
            ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
}