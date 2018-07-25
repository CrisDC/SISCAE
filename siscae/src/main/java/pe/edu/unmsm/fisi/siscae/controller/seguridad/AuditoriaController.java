package pe.edu.unmsm.fisi.siscae.controller.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaAuditoria;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecAuditoria;
import pe.edu.unmsm.fisi.siscae.service.ISecAuditoriaService;

public @RestController class AuditoriaController
{
    private @Autowired ISecAuditoriaService secAuditoriaService;

    @GetMapping(value = "/auditoria", params = "accion=buscarTodos")
    public List<SecAuditoria> getLsAuditoria()
    {
        return secAuditoriaService.getLsAuditoria();
    }

    @GetMapping(value = "seguridad/auditoria", params = "accion=buscar")
    public List<SecAuditoria> obtenerResultadoPorFecha(
            CriterioBusquedaAuditoria criterioBusquedaAuditoria)
    {
        return secAuditoriaService.obtenerResultadoPorFecha(criterioBusquedaAuditoria);
    }
}