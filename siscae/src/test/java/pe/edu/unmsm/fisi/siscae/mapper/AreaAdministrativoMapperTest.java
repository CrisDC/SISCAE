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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AreaAdministrativoMapperTest {

private @Autowired IAreaAdministrativoMapper areaAdministrativoMapper;
	
	@Test
	public void mantenerTipoGetTest(){

		
		AreaAdministrativo areaAdministrativoTest= new AreaAdministrativo();
		areaAdministrativoTest.setIdAreaAdministrativo(1);
		areaAdministrativoTest.setIdAdministrativo(1);
		areaAdministrativoTest.setIdAreaEstudio(1);
		areaAdministrativoTest.setFechaInicio(new Date());
		areaAdministrativoTest.setCargo("administrador");
		
		Parametro<AreaAdministrativo> operacion = new Parametro<>(Operacion.SELECT, areaAdministrativoTest, "TEST USER");
				
		List<AreaAdministrativo> areasAdministrativo = areaAdministrativoMapper.mantener(operacion);
		areasAdministrativo.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.INSERT.name());
		areasAdministrativo=areaAdministrativoMapper.mantener(operacion);
		areasAdministrativo.forEach(System.out::println);
				
		areaAdministrativoTest.setCargo("secretaria");
		operacion.setOperacion(Operacion.UPDATE.name());
		areasAdministrativo=areaAdministrativoMapper.mantener(operacion);
		areasAdministrativo.forEach(System.out::println);
		
		operacion.setOperacion(Operacion.DELETE.name());
		areasAdministrativo = areaAdministrativoMapper.mantener(operacion);
		areasAdministrativo.forEach(System.out::println);
		
		
	
	}
}
