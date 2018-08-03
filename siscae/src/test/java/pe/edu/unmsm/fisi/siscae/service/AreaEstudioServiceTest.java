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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaEstudio;
import pe.edu.unmsm.fisi.siscae.service.IAreaEstudioService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AreaEstudioServiceTest {
	private @Autowired IAreaEstudioService areaEstudioService;
	
	/*
	@Test
	public void registrarAreaEstudioTest(){
		AreaEstudio areaEstudioTest = new AreaEstudio();
		areaEstudioTest.setIdAreaEstudio(11);
		areaEstudioTest.setNombre("VIDEOFII");
		areaEstudioTest.setPabellon("PRIMER PABELLON");
		areaEstudioTest.setNivel("PRIMER NIVEL");
		areaEstudioService.registrarAreaEstudio(areaEstudioTest);
		
		assertTrue(areaEstudioService.existeAreaEstudio(areaEstudioTest.getIdAreaEstudio()));
		
	}
	@Test
	public void buscarTodosTest(){
		List<AreaEstudio> areasEstudio = areaEstudioService.buscarTodos();
		areasEstudio.stream().forEach(areaEstudio -> {
            System.out.println(areaEstudio.toString());
        });
	}
	@Test
	public void buscarPorIdAreaEstudio(){
		List<AreaEstudio> areasEstudio= areaEstudioService.buscarPorIdAreaEstudio(11);
		System.out.println("imprimire por id");
		areasEstudio.stream().forEach(areaEstudio -> {
            System.out.println(areaEstudio.toString());
        });
	}
	@Test
	public void existeAreaEstudioTest(){
		
		assertTrue(areaEstudioService.existeAreaEstudio(11));// el id ingresado de arriba
	
	}
	
	@Test
	public void actualizarAreaEstudioTest(){
		AreaEstudio areaEstudioTest = new AreaEstudio();
		areaEstudioTest.setIdAreaEstudio(13);
		areaEstudioTest.setNombre("VIDEOMATE");
		areaEstudioTest.setPabellon("PRIMER PABELLON");
		areaEstudioTest.setNivel("PRIMER NIVEL");
		
		areaEstudioService.registrarAreaEstudio(areaEstudioTest);
		
		areaEstudioTest.setNivel("SEGUNDO NIVEL");
		areaEstudioService.actualizarAreaEstudio(areaEstudioTest);
	}
	*/
	@Test
	public void eliminarAreaEstudio(){
	
		AreaEstudio areaEstudioTest = new AreaEstudio();
		areaEstudioTest.setIdAreaEstudio(87);
		areaEstudioTest.setNombre("VIDEOGEO");
		areaEstudioTest.setPabellon("SEGUNDO PABELLON");
		areaEstudioTest.setNivel("SEGUNDO NIVEL");
		
		areaEstudioService.registrarAreaEstudio(areaEstudioTest);
		
		areaEstudioService.eliminarAreaEstudio(areaEstudioTest);
		
		assertFalse(areaEstudioService.existeAreaEstudio(87));
		
	}
	
	
}
