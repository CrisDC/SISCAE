package pe.edu.unmsm.fisi.siscae.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import pe.edu.unmsm.fisi.siscae.configuracion.security.SecurityContextFacade;
import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaAdministrativoCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.IParametroGeneralService;

@Vista
public @Controller class HomeController
{
    private @Autowired IParametroGeneralService parametroGeneralService;
    private @Autowired IConsultaAdministrativoService consultaAdministrativoService; 

    @GetMapping(value = "/irPaginaInicio")
    public String irPageInicio(Principal principal, HttpSession session)
    {
        cargarInformacionUsuario(principal.getName(), session);
        return "redirect:/inicio";
    }

    public void cargarInformacionUsuario(String username, HttpSession session)
    {
        
        ConsultaAdministrativoCriterioBusqueda criterioBusqueda2 = new ConsultaAdministrativoCriterioBusqueda();
        criterioBusqueda2.setUsuario(SecurityContextFacade.obtenerNombreUsuario());
        List<ConsultaAdministrativo> listaAdministrativoUsuario = consultaAdministrativoService.buscarPorCriterio(criterioBusqueda2);
        session.setAttribute("nombreAdministrativo", listaAdministrativoUsuario.get(0).getNombre() + " " + listaAdministrativoUsuario.get(0).getAppPaterno()); 
        session.setAttribute("cargoAdministrativo", listaAdministrativoUsuario.get(0).getCargo());
        session.setAttribute("areaEstudioAdministrativo", listaAdministrativoUsuario.get(0).getAreaEstudio());
        //session.setAttribute("usuario", iUsuarioService.buscarUsuarioPorId(username));
    }
    
    @GetMapping("/inicio")
	public String irPaginaInicio(Model model, Principal principal) {
		//model.addAttribute("nDias", iSecUsuarioService.numCaducidadContrasenia(principal.getName()));
		model.addAttribute("usuario",principal.getName());
		return "redirect:/movimiento/estadoArea";
	}
    
   
}
