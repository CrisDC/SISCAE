package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.Date;
import java.util.List;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Material;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class MaterialMapperTest {

	private @Autowired IMaterialMapper materialMapper;
	
	@Test
	public void mantenerTipoGetTest() {
		
		Material material = new Material();
		
		material.setIdMaterial(1);
		material.setNombreMaterial("libro");
		material.setIdTipoMaterial(10);

		Parametro<Material> operacion = new Parametro<>(Operacion.SELECT, material, "TEST USER");	
		
		List<Material> materiales = materialMapper.mantener(operacion);
		materiales.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		materiales = materialMapper.mantener(operacion);
		materiales.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.UPDATE.name());
		materiales = materialMapper.mantener(operacion);
		materiales.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		materiales = materialMapper.mantener(operacion);
		materiales.forEach(System.out::println);
		
		
	}
	
	
}
