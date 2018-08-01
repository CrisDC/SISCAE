package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.unmsm.fisi.siscae.configuracion.PersistenceConfiguration;
import pe.edu.unmsm.fisi.siscae.configuracion.ServiceConfiguration;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaEstudio;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@ContextConfiguration(classes = { ServiceConfiguration.class, PersistenceConfiguration.class })
@RunWith(SpringJUnit4ClassRunner.class)
public class AreaEstudioMapperTest {

	private @Autowired IAreaEstudioMapper areaEstudioMapper;

	@Test
	public void mantenerTipoGetTest() {

		Parametro<AreaEstudio> operacion = new Parametro<>();

		AreaEstudio areaEstudioTest = new AreaEstudio();
		areaEstudioTest.setIdAreaEstudio(3);
		areaEstudioTest.setNombre("VIDEOFISI");
		areaEstudioTest.setPabellon("PRIMER PABELLON");
		areaEstudioTest.setNivel("PRIMER NIVEL");


		operacion.setOperacion(Operacion.SELECT.name());
		operacion.setObjeto(new AreaEstudio());
		
		List<AreaEstudio> areaEstudios = areaEstudioMapper.mantener(operacion);
		areaEstudios.stream().forEach(areaEstudio ->{
			System.out.println(areaEstudio.toString());
		});
		
		operacion = new Parametro<>(Operacion.INSERT, OperacionParam.PRIMARY_KEY, areaEstudioTest, "Usuario de prueba");
		areaEstudios.stream().forEach(areaEstudio ->{
			System.out.println(areaEstudio.toString());
		});

		areaEstudioTest.setNombre("SALA DE ESTUDIO");
		
		operacion.setOperacion(Operacion.UPDATE.name());
		operacion.setObjeto(areaEstudioTest);
		areaEstudios = areaEstudioMapper.mantener(operacion);
		areaEstudios.stream().forEach(areaEstudio ->{
			System.out.println(areaEstudio.toString());
		});
		
		/*operacion.setOperacion(Operacion.DELETE.name());
		areaEstudios = areaEstudioMapper.mantener(operacion);
		areaEstudios.stream().forEach(areaEstudio ->{
			System.out.println(areaEstudio.toString());
		});*/
		
	}

}
