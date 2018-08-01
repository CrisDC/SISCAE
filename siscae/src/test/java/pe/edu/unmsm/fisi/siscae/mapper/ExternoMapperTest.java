package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Externo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class ExternoMapperTest {
	
	private @Autowired IExternoMapper externoMapper;
	
	@Test
	public void mantenerTipoGetTest(){
		Externo externoTest = new Externo();
		externoTest.setEstadoExterno("HABILITADO");
		externoTest.setIdExterno(1);
		Parametro<Externo> operacion = new Parametro<Externo> (Operacion.SELECT, externoTest,"TEST USER");
		
		List<Externo> externos = externoMapper.mantener(operacion);
		externos.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		externos = externoMapper.mantener(operacion);
		externos.forEach(System.out::println);
		
		externoTest.setEstadoExterno("PRUEBA UPDATE");
		operacion.setOperacion(Operacion.UPDATE.name());
		externos = externoMapper.mantener(operacion);
		externos.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		externos = externoMapper.mantener(operacion);
		externos.forEach(System.out::println);
	}
	

}
