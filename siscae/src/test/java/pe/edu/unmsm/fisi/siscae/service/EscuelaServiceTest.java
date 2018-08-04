package pe.edu.unmsm.fisi.siscae.service;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Escuela;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class EscuelaServiceTest {
	private @Autowired IEscuelaService escuelaService;
	@Test
	public void registrarEscuelaTest(){
		Escuela escuelaTest = new Escuela();
		escuelaTest.setIdEscuela(1);
		escuelaTest.setNombre("Ingenieria de Sistemas");
		escuelaTest.setIdFacultad(20);
		escuelaService.registrarEscuela(escuelaTest);
		assertTrue(escuelaService.existeEscuela(escuelaTest.getIdEscuela()));
		
		
	}
	@Test
	public void buscarTodosTest(){
		List<Escuela> escuelas= escuelaService.buscarTodos();
		int foundSize= escuelas.size();
		System.out.println(foundSize);
		escuelas.stream().forEach(escuela -> {
            System.out.println(escuela.toString());
        });
		
	}
	@Test
	public void buscarPorIdEscuelaTest(){// puede ser tamaño uno 
		
		List<Escuela> escuelas= escuelaService.buscarPorIdEscuela(1);
		escuelas.stream().forEach(escuela -> {
            System.out.println(escuela.toString());
        });
	}
	@Test
	public void existeEscuelaTest(){
		
		assertTrue(escuelaService.existeEscuela(1));// el id ingresado de arriba
	}
	
	@Test
	public void actualizarEscuelaTest(){
		Escuela escuelaTest = new Escuela();
		escuelaTest.setIdEscuela(2);
		escuelaTest.setNombre("Ingenieria de Sistemas");
		escuelaTest.setIdFacultad(20);
		escuelaService.registrarEscuela(escuelaTest);
		
		escuelaTest.setIdEscuela(3);
		escuelaService.actualizarEscuela(escuelaTest);
		
	}
	@Test
	public void eliminarEscuela(){
		Escuela escuelaTest = new Escuela();
		escuelaTest.setIdEscuela(2);
		escuelaTest.setNombre("Ingenieria de Sistemas");
		escuelaTest.setIdFacultad(20);
		escuelaService.registrarEscuela(escuelaTest);
		
		escuelaService.eliminarEscuela(escuelaTest);
		assertFalse(escuelaService.existeEscuela(escuelaTest.getIdEscuela()));
	
	}
		
		
}
