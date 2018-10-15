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
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.IAreaEstudioService;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosService;
import pe.edu.unmsm.fisi.siscae.service.IEscuelaService;
import pe.edu.unmsm.fisi.siscae.service.IEstadoTablaService;
import pe.edu.unmsm.fisi.siscae.service.IFacultadService;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;
import pe.edu.unmsm.fisi.siscae.service.ITipoRecursoService;

@Vista
@Audit(accion = Accion.Visita, comentario = Comentario.Visita)
public @Controller class MantenimientoController
{

    private @Autowired IMultiTabDetService multiTabDetService;
    private @Autowired IEscuelaService escuelaService;
    private @Autowired IEstadoTablaService estadoTablaService;
    
    private @Autowired IAreaEstudioService areaEstudioService;
    private @Autowired ITipoRecursoService tipoRecursoService;
    private @Autowired IFacultadService facultadService;
    private @Autowired IAdministrativoService administrativoService;
    

/*   */
    @Audit(tipo = Tipo.RECURSO)
    @GetMapping("/{mantenimiento:recurso}")
    public String irPaginaMantenimientoRecurso(@PathVariable String mantenimiento, ModelMap model)
    {
    	
        model.addAttribute("mantenimiento", mantenimiento);
        
        model.addAttribute("areaEstudio", this.areaEstudioService.buscarTodos());
        model.addAttribute("estados",this.estadoTablaService.buscarporTablaOrigen("MAE_RECURSO"));
        model.addAttribute("tipoRecursos", this.tipoRecursoService.buscarTodos());
        return "seguras/mantenimiento/mantenimiento";
        
    }
    
   
    @Audit(tipo = Tipo.AREA_ADMINISTRATIVO)
    @GetMapping("/{mantenimiento:areaAdministrativo}")
    public String irPaginaMantenimientoAreaAdministrativo(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        
        model.addAttribute("areaEstudio", this.areaEstudioService.buscarTodos());
        model.addAttribute("administrativo", this.administrativoService.buscarConNombre());
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
        model.addAttribute("estado",this.estadoTablaService.buscarporTablaOrigen("MAE_HORARIO"));
        model.addAttribute("areaEstudio", this.areaEstudioService.buscarTodos());
        model.addAttribute("turno", this.multiTabDetService.buscarPorIdTabla(5));
        model.addAttribute("dia", this.multiTabDetService.buscarPorIdTabla(6));
        model.addAttribute("tipoHorario", this.multiTabDetService.buscarPorIdTabla(9));
        
        return "seguras/mantenimiento/mantenimiento";
    }
   
    @Audit(tipo = Tipo.ESCUELA)
    @GetMapping("/{mantenimiento:escuela}")
    public String irPaginaMantenimientoEscuela(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("facultad", this.facultadService.buscarTodos());
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.EXTERNO)
    @GetMapping("/{mantenimiento:externo}")
    public String irPaginaMantenimientoExterno(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("tipoDocumento", this.multiTabDetService.buscarPorIdTabla(1));
        model.addAttribute("estado",this.estadoTablaService.buscarporTablaOrigen("MAE_EXTERNO"));
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
        model.addAttribute("estado",this.estadoTablaService.buscarporTablaOrigen("MAE_DOCENTE"));
        model.addAttribute("tipoDocumento", this.multiTabDetService.buscarPorIdTabla(1));
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.ALUMNO)
    @GetMapping("/{mantenimiento:alumno}")
    public String irPaginaMantenimientoAlumno(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("estados", this.estadoTablaService.buscarporTablaOrigen("MAE_ALUMNO"));
        model.addAttribute("tipoDocumento", this.multiTabDetService.buscarPorIdTabla(1));
        model.addAttribute("tiposAcademico", this.multiTabDetService.buscarPorIdTabla(3));
        model.addAttribute("escuelas", this.escuelaService.buscarTodos());
        return "seguras/mantenimiento/mantenimiento";
    }

    @Audit(tipo = Tipo.ADMINISTRATIVO)
    @GetMapping("/{mantenimiento:administrativo}")
    public String irPaginaMantenimientoAdministrativo(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("tipoDocumento", this.multiTabDetService.buscarPorIdTabla(1));
        return "seguras/mantenimiento/mantenimiento";
    }


    @Audit(tipo = Tipo.MATERIAL)
    @GetMapping("/{mantenimiento:material}")
    public String irPaginaMantenimientoMaterial(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
/**/
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

    @Audit(tipo = Tipo.PERSONA)
    @GetMapping("/{mantenimiento:persona}")
    public String irPaginaMantenimientoPersona(@PathVariable String mantenimiento, ModelMap model)
    {
        model.addAttribute("mantenimiento", mantenimiento);
        model.addAttribute("tipoDocumento", this.multiTabDetService.buscarPorIdTabla(1));
        return "seguras/mantenimiento/mantenimiento";
    }
    @Audit(tipo = Tipo.TIPO_RECURSO)
    @GetMapping("/{mantenimiento:tipoRecurso}")
    public String irPaginaMantenimientoTipoRecurso(@PathVariable String mantenimiento, ModelMap model)
    {
    	
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
    @Audit(tipo = Tipo.ROL)
    @GetMapping("/{mantenimiento:rol}")
    public String irPaginaMantenimientoRol(@PathVariable String mantenimiento, ModelMap model)
    {
    	
        model.addAttribute("mantenimiento", mantenimiento);
        return "seguras/mantenimiento/mantenimiento";
    }
    
}