package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Administrativo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.service.IAdministrativoService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)

public class AdministrativoServiceTest {
	
	private @Autowired IAdministrativoService administrativoService;
	
	 @Test
	    public void test(){
		 
		 Persona personaTest = new Persona();
		 Administrativo administrativoTest = new Administrativo();
		 personaTest.setIdPersona(597);
		 administrativoTest.setPersona(personaTest);
		 administrativoTest.setCodigoAdm("123");
		 
		 administrativoService.actualizar(administrativoTest);
		 
		 List<Administrativo> administrativos = administrativoService.buscarTodos();
		 administrativos.forEach(System.out::println);
		 
		 
//		 Administrativo administrativo = administrativoService.buscarPorId(1);
//		 System.out.println(administrativo);
		 
		 
		 
		
		 
		 
		 
		 
		 
	    }

}
