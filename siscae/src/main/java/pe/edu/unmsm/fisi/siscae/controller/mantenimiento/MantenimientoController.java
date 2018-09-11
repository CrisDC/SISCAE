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
import pe.edu.unmsm.fisi.siscae.service.IEscuelaService;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;

@Vista
@Audit(accion = Accion.Visita, comentario = Comentario.Visita)
public @Controller class MantenimientoController
{

    private @Autowired IMultiTabDetService multiTabDetService;
    private @Autowired IEscuelaService escuelaService;

    @Audit(tipo = Tipo.RECURSO)
    @GetMapping("/{mantenimiento:recurso}")
    public String irPaginaMantenimientoRecurso(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.AREA_ESTUDIO)
    @GetMapping("/{mantenimiento:areaEstudio}")
    public String irPaginaMantenimientoAreaEstudio(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.HORARIO)
    @GetMapping("/{mantenimiento:horario}")
    public String irPaginaMantenimientoHorario(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
   
    @Audit(tipo = Tipo.ESCUELA)
    @GetMapping("/{mantenimiento:escuela}")
    public String irPaginaMantenimientoEscuela(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    @Audit(tipo = Tipo.FACULTAD)
    @GetMapping("/{mantenimiento:facultad}")
    public String irPaginaMantenimientoFacultad(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.DOCENTE)
    @GetMapping("/{mantenimiento:docente}")
    public String irPaginaMantenimientoDocente(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.ALUMNO)
    @GetMapping("/{mantenimiento:alumno}")
    public String irPaginaMantenimientoAlumno(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("tiposAcademico", this.multiTabDetService.buscarPorIdTabla(3));
        model.addAttribute("escuelas", this.escuelaService.buscarTodos());
        return "seguras/mantenimiento/mantenimiento";
    }
    

    @Audit(tipo = Tipo.MulTabCab)
    @GetMapping("/{mantenimiento:multiTabCab}")
    public String irPaginaMantenimientoMultiTabCab(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.MulTabDet)
    @GetMapping("/{mantenimiento:multiTabDet}")
    public String irPaginaMantenimientoMultiTabDet(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
   
}