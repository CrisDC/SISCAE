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
import pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento.AdministrativoService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AdministrativoServiceTest {
	
	private @Autowired AdministrativoService administrativoService;
	
	
	 @Test
	    public void test()
	    {
		 
		 List<Administrativo> administrativos = administrativoService.buscarTodos();
		 administrativos.stream().forEach(administrativo -> {
            System.out.println(administrativo.toString());
            });
		 
		 
	    }

}
