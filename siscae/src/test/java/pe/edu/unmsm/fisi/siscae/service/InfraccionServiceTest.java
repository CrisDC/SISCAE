
package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Infraccion;
import pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento.InfraccionService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class InfraccionServiceTest {

	private @Autowired InfraccionService infraccionService;
	

	 @Test
	    public void test()
	    {
		 
		 List<Infraccion> infracciones = infraccionService.buscarTodos();
		 infracciones.stream().forEach(infraccion -> {
           System.out.println(infraccion.toString());
           });
		 
		 
	    }
	
	
}
