package pe.edu.unmsm.fisi.siscae.controller;


import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@Controller
@RequestMapping("/siscae")
public class InicioController {
	
	public static final String INICIO_VIEW = "content/user/inicio";
		

	@GetMapping("/inicioS")
	public String inicioBiblioteca(){
		
		return "template";
		
	}
	
}
