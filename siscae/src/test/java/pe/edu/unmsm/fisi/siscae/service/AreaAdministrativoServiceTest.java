package pe.edu.unmsm.fisi.siscae.service;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;
import pe.edu.unmsm.fisi.siscae.service.IAreaAdministrativoService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AreaAdministrativoServiceTest {

private @Autowired IAreaAdministrativoService areaAdministrativoService;
	
	@Test
	public void test(){
		List<AreaAdministrativo> areasAdministrativo = areaAdministrativoService.buscarTodos();
		areasAdministrativo.stream().forEach(areaAdministrativo -> {
            System.out.println(areaAdministrativo.toString());
        });
	}
	@Test
	public void registrarAreaAdministrativoTest(){
		AreaAdministrativo areaAdministrativoTest= new AreaAdministrativo();
		areaAdministrativoTest.setIdAreaAdministrativo(1);
		areaAdministrativoTest.setIdAdministrativo(1);
		areaAdministrativoTest.setIdAreaEstudio(2);
		areaAdministrativoTest.setFechaInicio(new Date());
		areaAdministrativoTest.setCargo("administrador");
		areaAdministrativoService.registrarAreaAdministrativo(areaAdministrativoTest);
		
		//Comprobacion de que si agrego
		assertTrue(areaAdministrativoService.existeAreaAdministrativo(areaAdministrativoTest.getIdAreaAdministrativo()));
	}
	
	@Test
	public void buscarTodosTest(){
		List<AreaAdministrativo> areasAdministrativo= areaAdministrativoService.buscarTodos();
		int foundSize= areasAdministrativo.size();
		System.out.println(foundSize);
		areasAdministrativo.stream().forEach(areaAdministrativo -> {
            System.out.println(areaAdministrativo.toString());
        });
	}
	@Test
	public void buscarPorIdAreaAdministrativoTest(){// puede ser tamaño uno 
		
		List<AreaAdministrativo> areasAdministrativo= areaAdministrativoService.buscarPorIdAreaAdministrativo(1);
		areasAdministrativo.stream().forEach(areaAdministrativo -> {
            System.out.println(areaAdministrativo.toString());
        });
	}
	@Test
	public void existeAreaAdministrativoTest(){
		
		assertTrue(areaAdministrativoService.existeAreaAdministrativo(1));// el id ingresado de arriba
	}
	
	@Test
	public void actualizarAreaAdministrativoTest(){
		AreaAdministrativo areaAdministrativoTest= new AreaAdministrativo();
		areaAdministrativoTest.setIdAdministrativo(1);
		areaAdministrativoTest.setIdAreaEstudio(4);
		areaAdministrativoTest.setFechaInicio(new Date());
		areaAdministrativoTest.setCargo("administrador");
		areaAdministrativoService.registrarAreaAdministrativo(areaAdministrativoTest);
		
		areaAdministrativoTest.setCargo("secretario");
		areaAdministrativoService.actualizarAreaAdministrativo(areaAdministrativoTest);
		
		}
	@Test
	public void eliminarAreaAdministrativo(){
		AreaAdministrativo areaAdministrativoTest= new AreaAdministrativo();
		areaAdministrativoTest.setIdAreaAdministrativo(1);
		areaAdministrativoTest.setIdAdministrativo(1);
		areaAdministrativoTest.setIdAreaEstudio(4);
		areaAdministrativoTest.setFechaInicio(new Date());
		areaAdministrativoTest.setCargo("administrador2");
		areaAdministrativoService.registrarAreaAdministrativo(areaAdministrativoTest);
		areaAdministrativoService.eliminarAreaAdministrativo(areaAdministrativoTest);
		assertFalse(areaAdministrativoService.existeAreaAdministrativo(areaAdministrativoTest.getIdAreaAdministrativo()));
	
	}
	
}
