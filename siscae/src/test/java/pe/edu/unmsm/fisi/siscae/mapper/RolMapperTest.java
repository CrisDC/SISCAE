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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Rol;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)

public  class RolMapperTest {
	private @Autowired IRolMapper rolMapper;
	@Test
		public void mantenerTipoGetTest(){
			Rol rolTest = new Rol();
			rolTest.setIdRol(1);
			rolTest.setNombre("ESTADO");;
			Parametro<Rol> operacion = new Parametro<Rol> (Operacion.SELECT, rolTest,"TEST USER");
			
			List<Rol> externos = rolMapper.mantener(operacion);
			externos.forEach(System.out::println);
			
			operacion.setOperacion(Operacion.INSERT.name());
			externos = rolMapper.mantener(operacion);
			externos.forEach(System.out::println);
			
			rolTest.setNombre("PRUEBA UPDATE");
			operacion.setOperacion(Operacion.UPDATE.name());
			externos = rolMapper.mantener(operacion);
			externos.forEach(System.out::println);
			
			operacion.setOperacion(Operacion.DELETE.name());
			externos = rolMapper.mantener(operacion);
			externos.forEach(System.out::println);
		}
		
	}
	
	
	


