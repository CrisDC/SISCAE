package pe.edu.unmsm.fisi.siscae.service;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.time.LocalTime;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaEstudio;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Horario;
import pe.edu.unmsm.fisi.siscae.service.IAreaEstudioService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AreaEstudioServiceTest {
	private @Autowired IAreaEstudioService areaEstudioService;
	
	
	@Test
	public void registrarAreaEstudioTest(){
		AreaEstudio areaEstudioTest = new AreaEstudio();
		areaEstudioTest.setIdAreaEstudio(3);
		areaEstudioTest.setNombre("VIDEOFISI");
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
	public void buscarPorIdAreaEstudio(Integer idAreaEstudio){
		List<AreaEstudio> areasEstudio= areaEstudioService.buscarPorIdAreaEstudio(1);
		areasEstudio.stream().forEach(areaEstudio -> {
            System.out.println(areaEstudio.toString());
        });
	}
	@Test
	public void existeAreaEstudioTest(){
		
		assertTrue(areaEstudioService.existeAreaEstudio(3));// el id ingresado de arriba
	
	}
	
	@Test
	public void actualizarAreaEstudioTest(){
		AreaEstudio areaEstudioTest = new AreaEstudio();
		areaEstudioTest.setIdAreaEstudio(3);
		areaEstudioTest.setNombre("VIDEOFISI");
		areaEstudioTest.setPabellon("PRIMER PABELLON");
		areaEstudioTest.setNivel("PRIMER NIVEL");
		
		areaEstudioService.registrarAreaEstudio(areaEstudioTest);
		
		areaEstudioTest.setNivel("SEGUNDO NIVE");;
		areaEstudioService.actualizarAreaEstudio(areaEstudioTest);
	}
	
	@Test
	public void eliminarAreaEstudio(){
		AreaEstudio areaEstudioTest = new AreaEstudio();
		areaEstudioTest.setIdAreaEstudio(4);
		areaEstudioTest.setNombre("VIDEOFISI");
		areaEstudioTest.setPabellon("SEGUNDO PABELLON");
		areaEstudioTest.setNivel("SEGUNDO NIVEL");
		
		areaEstudioService.registrarAreaEstudio(areaEstudioTest);
		
		areaEstudioService.eliminarAreaEstudio(areaEstudioTest);
		assertFalse(areaEstudioService.existeAreaEstudio(areaEstudioTest.getIdAreaEstudio()));
		
	}
	
	
}
