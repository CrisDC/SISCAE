package pe.edu.unmsm.fisi.siscae.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import pe.edu.unmsm.fisi.siscae.configuracion.security.SecurityContextFacade;
import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaAdministrativoCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.seguridad.Cambiocontra;
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
    
    @CrossOrigin(origins = "http://localhost:8280")
    @GetMapping("/hola")
	public String irConfiguracionContrasenia(Model model, Principal principal) {
    	BCryptPasswordEncoder encriptador = new BCryptPasswordEncoder();
    	System.out.println("------------------------------------------------------");
    	System.out.println(encriptador.encode("Bica"));
    	System.out.println(encriptador.encode("12345"));
    	if(encriptador.matches("Bica", encriptador.encode("Bica"))) {
    		System.out.println("si es igual");
    	}else {
    		System.out.println("no es igual");
    	}
    	if(encriptador.matches("Bica2", encriptador.encode("Bica"))) {
    		System.out.println("si es igual");
    	}else {
    		System.out.println("no es igual");
    	}
		model.addAttribute("usuario",principal.getName());
		return "seguras/inicio";
	}
    
    
    //@RequestMapping(value = "/username", method = RequestMethod.GET)
    @GetMapping("/username")
    @ResponseBody
    public String name() {
    	String currentUserName= "";
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	if (!(authentication instanceof AnonymousAuthenticationToken)) {
    	    currentUserName = authentication.getName(); 
    	}
    	System.out.println("**************************************");
    	System.out.println("nombre user es "+ currentUserName );
    	return currentUserName;
    }
    
    @PostMapping("/cambiocontra")
    @ResponseBody	
    public Cambiocontra cambiar(@RequestBody Cambiocontra c) {
    	Cambiocontra nuevo = new Cambiocontra();
    	BCryptPasswordEncoder encriptador = new BCryptPasswordEncoder();
    	if(encriptador.matches(c.getIngrepass(), c.getPass())) {
    		nuevo.setNuevopass(encriptador.encode(c.getNuevopass()));
    	}else {
    		nuevo.setNuevopass("incorrecto");
    	}
    	nuevo.setPass(c.getPass());
    	nuevo.setUsername(c.getUsername());
		nuevo.setIngrepass(c.getIngrepass());
    	return nuevo;
    }
    
    
}
