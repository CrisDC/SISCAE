package pe.edu.unmsm.fisi.siscae.mapper;

import java.sql.Date;
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
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AreaAdministrativoMapperTest {

	private @Autowired IAreaAdministrativoMapper areaAdministrativoMapper;
	
	@Test
	public void mantenerTipoGetTest(){

		Parametro<AreaAdministrativo> operacion = new Parametro<>();
		
		AreaAdministrativo areaAdministrativoTest= new AreaAdministrativo();
		areaAdministrativoTest.setIdAdministrativo(1);
		areaAdministrativoTest.setIdAreaEstudio(2);
		areaAdministrativoTest.setFechaInicio(Date.valueOf("12/15/1990"));
		areaAdministrativoTest.setCargo("administrador");
		
		operacion.setOperacion(Operacion.SELECT.name());
		operacion.setObjeto(new AreaAdministrativo());
		
		List<AreaAdministrativo> areasAdministrativo = areaAdministrativoMapper.mantener(operacion);
		areasAdministrativo.stream().forEach(areaAdministrativo ->{
			System.out.println(areaAdministrativo.toString());
		});
		
		operacion=new Parametro<>(Operacion.INSERT, OperacionParam.PRIMARY_KEY,areaAdministrativoTest, "Usuario de prueba");
		areasAdministrativo.stream().forEach(horario ->{
			System.out.println(horario.toString());
		});
				
		areaAdministrativoTest.setCargo("secretaria");
		operacion.setOperacion(Operacion.UPDATE.name());
		operacion.setObjeto(areaAdministrativoTest);
		
		areasAdministrativo = areaAdministrativoMapper.mantener(operacion);
		areasAdministrativo.stream().forEach(areaAdministrativo ->{
			System.out.println(areaAdministrativo.toString());
		});
		operacion.setOperacion(Operacion.DELETE.name());
		areasAdministrativo = areaAdministrativoMapper.mantener(operacion);
		
		areasAdministrativo.stream().forEach(areaAdministrativo ->{
			System.out.println(areaAdministrativo.toString());
		});
		
		
	
	}
}
