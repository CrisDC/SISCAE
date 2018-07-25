package pe.edu.unmsm.fisi.siscae.controller.reporte;

import static pe.edu.unmsm.fisi.siscae.utilitario.ReporteUtil.RESUMEN_AUTORIZACION;
import static pe.edu.unmsm.fisi.siscae.utilitario.ReporteUtil.RESUMEN_SW_DMP_LOG;
import static pe.edu.unmsm.fisi.siscae.utilitario.ReporteUtil.RESUMEN_TRANSACCION_APROBADA_AGENCIA;

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
import pe.edu.unmsm.fisi.siscae.service.IClienteService;
import pe.edu.unmsm.fisi.siscae.service.IEmpresaService;
import pe.edu.unmsm.fisi.siscae.service.IMembresiaService;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;
import pe.edu.unmsm.fisi.siscae.utilitario.MultiTablaUtil;

@Vista
@Audit(accion = Accion.Visita, comentario = Comentario.Visita)
@RequestMapping("/reporte")
public @Controller class ReporteController
{
 
    private @Autowired IMembresiaService membresiaService;
    private @Autowired IMultiTabDetService multiTabDetService;
    private @Autowired IEmpresaService empresaService;
    private @Autowired IClienteService clienteService;

    @Audit(tipo = Tipo.RptComisCuadre)
    @GetMapping("/resumen/{reporte:comisionInstResumen}")
    public String irPaginaReporteComisionBancoAdministrador(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteResumen";
    }

    @Audit(tipo = Tipo.RptAutCanal)
    @GetMapping("/autorizacion/{reporte:canal}")
    public String irPaginaReporteAutorizacionCanal(@PathVariable String reporte, ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteAutorizacion";
    }

    @Audit(tipo = Tipo.RptAutIdProc)
    @GetMapping("/autorizacion/{reporte:procesoSwitch}")
    public String irPaginaReporteAutorizacionProcesoSwitch(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteAutorizacion";
    }

    @Audit(tipo = Tipo.RptAutCodRpta)
    @GetMapping("/autorizacion/{reporte:respuestaSwitch}")
    public String irPaginaReporteAutorizacionRespuestaSwitch(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteAutorizacion";
    }

    @Audit(tipo = Tipo.RptAutAtm)
    @GetMapping("/autorizacion/{reporte:atm}")
    public String irPaginaReporteAutorizacionRespuestaAtm(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteAutorizacion";
    }

    @Audit(tipo = Tipo.RptTarResEmi)
    @GetMapping("/tarifario/{reporte:resumenEmisor}")
    public String irPaginaReporteTarifario(@PathVariable String reporte, ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteTarifario";
    }

    @Audit(tipo = Tipo.RptTarDetEmi)
    @GetMapping("/tarifario/{reporte:detalleEmisor}")
    public String irPaginaReporteTarifarioDetalleEmisor(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteTarifario";
    }

    @Audit(tipo = Tipo.RptTarDetAdq)
    @GetMapping("/tarifario/{reporte:detalleAdquirente}")
    public String irPaginaReporteTarifarioDetalleAdquirente(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteTarifario";
    }

    @Audit(tipo = Tipo.RptTarResAdq)
    @GetMapping("/tarifario/{reporte:resumenAdquirente}")
    public String irPaginaReporteTarifarioResumenAdquirente(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteTarifario";
    }

    @Audit(tipo = Tipo.RptTarDetSur)
    @GetMapping("/tarifario/{reporte:detalleSurcharge}")
    public String irPaginaReporteTarifarioDetalleSurcharge(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteTarifario";
    }

    @Audit(tipo = Tipo.RptTarResSur)
    @GetMapping("/tarifario/{reporte:resumenSurcharge}")
    public String irPaginaReporteTarifarioResumenSurcharge(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteTarifario";
    }

    @Audit(tipo = Tipo.RptConcilObs)
    @GetMapping("/{reporte:conciliacionesObservadas}")
    public String irPaginaReporteConciliacionesObservadas(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        model.addAttribute("origenesArchivo",
                multiTabDetService.buscarPorIdTabla(MultiTablaUtil.TABLA_ORIGEN_ARCHIVO));
        return "seguras/reporte/reporteConciliacionesObservadas";
    }

    @Audit(tipo = Tipo.RptContMov)
    @GetMapping("/contabilizacion/{reporte:movimiento}")
    public String irPaginaReporteContabilizacionMovimiento(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        model.addAttribute("empresas", empresaService.buscarTodos());
        model.addAttribute("indicadoresContabilizacion", multiTabDetService
                .buscarPorIdTabla(MultiTablaUtil.TABLA_INDICADOR_CONTABILIZACION));
        return "seguras/reporte/reporteContabilizacion";
    }

    @Audit(tipo = Tipo.RptContComis)
    @GetMapping("/contabilizacion/{reporte:comisiones}")
    public String irPaginaReporteContabilizacionComisiones(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        model.addAttribute("empresas", empresaService.buscarTodos());
        model.addAttribute("indicadoresContabilizacion", multiTabDetService
                .buscarPorIdTabla(MultiTablaUtil.TABLA_INDICADOR_CONTABILIZACION));
        return "seguras/reporte/reporteContabilizacion";
    }

    @Audit(tipo = Tipo.RptCompEmiCanal)
    @GetMapping("/compensacion/emisor/{reporte:canal}")
    public String irPaginaReporteCompensacionEmisorCanal(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteCompensacion";
    }

    @Audit(tipo = Tipo.RptCompEmiInst)
    @GetMapping("/compensacion/emisor/{reporte:institucion}")
    public String irPaginaReporteCompensacionEmisorInstitucion(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteCompensacion";
    }

    @Audit(tipo = Tipo.RptCompRec)
    @GetMapping("/compensacion/{reporte:receptor}")
    public String irPaginaReporteCompensacionReceptor(@PathVariable String reporte, ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        return "seguras/reporte/reporteCompensacion";
    }

    @Audit(tipo = Tipo.RptMovAut)
    @GetMapping("/resumen/movimiento/{reporte:autorizacion}")
    public String irPaginaReporteResumenMovimiento(@PathVariable String reporte, ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        agregarAtributos(model, reporte);
        return "seguras/reporte/reporteResumenMovimiento";
    }

    @Audit(tipo = Tipo.RptMovSwDmpLog)
    @GetMapping("/resumen/movimiento/{reporte:swDmpLog}")
    public String irPaginaReporteResumenMovimientoSwDmpLog(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        agregarAtributos(model, reporte);
        return "seguras/reporte/reporteResumenMovimiento";
    }

    @Audit(tipo = Tipo.RptMovTransAg)
    @GetMapping("/resumen/movimiento/{reporte:transaccionAprobadaAgencia}")
    public String irPaginaReporteResumenMovimientoTransaccionAprobadaAgencia(
            @PathVariable String reporte, ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        agregarAtributos(model, reporte);
        return "seguras/reporte/reporteResumenMovimiento";
    }

    @Audit(tipo = Tipo.RptMovLgCntEmi)
    @GetMapping("/resumen/movimiento/{reporte:logContableEmisor}")
    public String irPaginaReporteResumenLogContableEmisor(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        model.addAttribute("membresias", membresiaService.buscarTodos());
        model.addAttribute("rolesTransaccion",
                multiTabDetService.buscarPorIdTabla(MultiTablaUtil.TABLA_ROL_TRANSACCION));       
        return "seguras/reporte/reporteResumenMovimiento";
    }

    @Audit(tipo = Tipo.RptMovLgCntRec)
    @GetMapping("/resumen/movimiento/{reporte:logContableReceptor}")
    public String irPaginaReporteResumenLogContableReceptor(@PathVariable String reporte,
            ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        model.addAttribute("membresias", membresiaService.buscarTodos());
        model.addAttribute("rolesTransaccion",
                multiTabDetService.buscarPorIdTabla(MultiTablaUtil.TABLA_ROL_TRANSACCION));
        return "seguras/reporte/reporteResumenMovimiento";
    }

    
    private void agregarAtributos(ModelMap model, String reporte)
    {
        switch (reporte)
        {
        case RESUMEN_AUTORIZACION:
            model.addAttribute("rolesTransaccion",
                    multiTabDetService.buscarPorIdTabla(MultiTablaUtil.TABLA_ROL_TRANSACCION));
            break;
        case RESUMEN_SW_DMP_LOG:
            model.addAttribute("rolesTransaccion",
                    multiTabDetService.buscarPorIdTabla(MultiTablaUtil.TABLA_ROL_TRANSACCION));
  
            break;
        case RESUMEN_TRANSACCION_APROBADA_AGENCIA:
            model.addAttribute("sexos",
                    multiTabDetService.buscarPorIdTabla(MultiTablaUtil.TABLA_SEXO));
            model.addAttribute("estadosCivil",
                    multiTabDetService.buscarPorIdTabla(MultiTablaUtil.TABLA_ESTADO_CIVIL));
            break;
        }
    }

    
    @GetMapping("/prepago/{reporte:anexo1|anexo2}")
    public String irPaginaReporteContablePrepago(@PathVariable String reporte, ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        model.addAttribute("empresas", empresaService.buscarTodos());
        return "seguras/reporte/reporteContablePrepago";
    }

    @GetMapping("/prepago/{reporte:estadoCuenta}")
    public String irPaginaReporteEstadoCuenta(@PathVariable String reporte, ModelMap model)
    {
        model.addAttribute("reporte", reporte);
        model.addAttribute("empresas", empresaService.buscarTodos());
        model.addAttribute("clientes", clienteService.buscarTodos());
        return "seguras/reporte/reporteEstadoCuenta";
    }

}