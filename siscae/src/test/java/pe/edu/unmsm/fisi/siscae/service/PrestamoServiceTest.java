package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Prestamo;
import pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento.PrestamoService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class PrestamoServiceTest {

	private @Autowired PrestamoService prestamoService;
	
	
	 @Test
	    public void test()
	    {
		 
		 List<Prestamo> prestamos = prestamoService.buscarTodos();
		 prestamos.stream().forEach(prestamo -> {
            System.out.println(prestamo.toString());
		 });
		 
	    }
}
