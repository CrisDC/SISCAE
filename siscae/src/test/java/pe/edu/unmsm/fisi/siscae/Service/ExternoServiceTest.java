package pe.edu.unmsm.fisi.siscae.Service;

import java.util.List;



import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Externo;
import pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento.ExternoService;
@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class ExternoServiceTest {
	private @Autowired ExternoService externoService;
	
	
	 @Test
	    public void test()
	    {
		 
		 List<Externo> externos = externoService.buscarTodos();
		 externos.stream().forEach(externo -> {
         System.out.println(externo.toString());
         });
		 
		 
	    }
}


