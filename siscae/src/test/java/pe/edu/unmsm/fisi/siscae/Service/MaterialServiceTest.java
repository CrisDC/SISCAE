package pe.edu.unmsm.fisi.siscae.Service;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Material;
import pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento.MaterialService;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class MaterialServiceTest {

	private @Autowired MaterialService materialService;
	
	
	 @Test
	    public void test()
	    {
		 List<Material> materiales = materialService.buscarTodos();
		 materiales.stream().forEach(material -> {
            System.out.println(material.toString());
		 });
		 
	    }
}
