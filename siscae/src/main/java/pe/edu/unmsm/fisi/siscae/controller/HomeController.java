package pe.edu.unmsm.fisi.siscae.controller;

import java.security.Principal;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.service.IParametroGeneralService;

@Vista
public @Controller class HomeController
{
    private @Autowired IParametroGeneralService parametroGeneralService;


    @GetMapping(value = "/irPaginaInicio")
    public String irPageInicio(Principal principal, HttpSession session)
    {
        cargarInformacionUsuario(principal.getName(), session);
        return "redirect:/inicio";
    }

    public void cargarInformacionUsuario(String username, HttpSession session)
    {
        session.setAttribute("nombreUsuario", username); 
       //session.setAttribute("usuario", iUsuarioService.buscarUsuarioPorId(username));
    }
    
    /*
    @GetMapping("/inicio")
	public String irPaginaInicio(Model model, Principal principal) {
		//model.addAttribute("nDias", iSecUsuarioService.numCaducidadContrasenia(principal.getName()));
		model.addAttribute("usuario",principal.getName());
		return "seguras/inicio";
	}*/
    
    @GetMapping("/inicio")
	public String irPaginaInicioS() {
		return "template/fragments/guiuser/inicio";
	}
    
   
}
