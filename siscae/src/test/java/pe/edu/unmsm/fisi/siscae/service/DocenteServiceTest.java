package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Docente;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.service.IDocenteService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class DocenteServiceTest {

	private @Autowired IDocenteService docenteService;
	
	@Test
	public void test(){
		
		Persona personaTest = new Persona();
		Docente docenteTest = new Docente();
		personaTest.setIdPersona(4);
		docenteTest.setPersona(personaTest);
		docenteTest.setIdEstadoTabla(1);
		
		List<Docente> docentes = docenteService.buscarTodos();
		docentes.forEach(System.out::println);
		
		docentes = docenteService.buscarPorIdDocente(4);
		docentes.forEach(System.out::println);
		
		docenteService.registrarDocente(docenteTest);
		
		docenteTest.setIdEstadoTabla(2);
		docenteService.actualizarDocente(docenteTest);
		
		docenteService.eliminarDocente(docenteTest);
		
	}
	
}
